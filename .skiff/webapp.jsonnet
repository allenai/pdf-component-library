/**
 * This is a template that's compiled down to a definition of the
 * infrastructural resources required for running your application.
 *
 * For more information on the JSONNET language, see:
 * https://jsonnet.org/learning/getting_started.html
 */

// This file is generated once at template creation time and unlikely to change
// from that point forward.
local config = import '../skiff.json';
local util = import './util.libsonnet';

function(
    apiImage, proxyImage, cause, sha, env='prod', branch='', repo='',
    buildId=''
)
    // A list of hostnames served by your application. By default your application's
    // `prod` environment will receive requests made to `$appName.apps.allenai.org` and
    // non-production environments will receive requests made to `$appName-$env.apps.allenai.org`.
    //
    // If you'd like to use a custom domain make sure DNS is pointed to the cluster's IP
    // address and add the domain to the `customDomains` list in `../skiff.json`.
    local hosts = util.getHosts(env, config);

    // In production you run should run two or more replicas of your
    // application, so that if one instance goes down or is busy (e.g., during
    // a deployment), users can still use the remaining replicas of your
    // application.
    //
    // However, if you use GPUs, which are expensive, consider setting the prod
    // replica count to 1 as a trade-off between availability and costs.
    //
    // In all other environments (e.g., adhocs) we run a single instance to
    // save money.
    local numReplicas = if env == 'prod' then config.replicas.prod else 1;

    // Each app gets it's own namespace.
    local namespaceName = config.appName;

    // Since we deploy resources for different environments in the same namespace,
    // we need to give things a fully qualified name that includes the environment
    // as to avoid unintentional collission / redefinition.
    local fullyQualifiedName = config.appName + '-' + env;

    // Every resource is tagged with the same set of labels. These labels serve the
    // following purposes:
    //  - They make it easier to query the resources, i.e.
    //      kubectl get pod -l app=my-app,env=staging
    //  - The service definition uses them to find the pods it directs traffic to.
    local namespaceLabels = {
        app: config.appName,
        contact: config.contact,
        team: config.team
    };

    local labels = namespaceLabels + {
        env: env
    };

    local selectorLabels = {
        app: config.appName,
        env: env
    };

    // By default multiple instances of your application could get scheduled
    // to the same node. This means if that node goes down your application
    // does too. We use the label below to avoid that.
    local antiAffinityLabels = {
        onlyOneOfPerNode: config.appName + '-' + env
    };
    local podLabels = labels + antiAffinityLabels;

    // Annotations carry additional information about your deployment that
    // we use for auditing, debugging and administrative purposes
    local annotations = {
        "apps.allenai.org/sha": sha,
        "apps.allenai.org/branch": branch,
        "apps.allenai.org/repo": repo,
        "apps.allenai.org/build": buildId
    };

    // Running on a GPU requires a special limit on the container, and a
    // specific nodeSelector.
    local gpuInConfig = std.count(std.objectFields(config), "gpu") > 0;
    local gpuCount = if config.gpu == "t4x4" then 4 else 1;
    local gpuLimits = if gpuInConfig then { 'nvidia.com/gpu': gpuCount } else {};
    local nodeSelector = if gpuInConfig then
        if config.gpu == "k80" then
            { 'cloud.google.com/gke-accelerator': 'nvidia-tesla-k80' }
        else if config.gpu == "p100" then
            { 'cloud.google.com/gke-accelerator': 'nvidia-tesla-p100' }
        else if config.gpu == "t4x4" then
            { 'cloud.google.com/gke-accelerator': 'nvidia-tesla-t4' }
        else
            error "invalid GPU specification; expected 'k80', 'p100' or 't4x4', but got: " + config.gpu
    else
         { };

    // The port the NGINX proxy is bound to.
    local proxyPort = 8080;

    // The port the API (Python Flask application) is bound to.
    local apiPort = 8000;

    // This is used to verify that the proxy (and thereby the UI portion of the
    // application) is healthy. If this fails the application won't receive traffic,
    // and may be restarted.
    local proxyHealthCheck = {
        port: proxyPort,
        scheme: 'HTTP'
    };

    // This is used to verify that the API is funtional.
    local apiHealthCheck = {
        port: apiPort,
        scheme: 'HTTP'
    };

    local namespace = {
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
            name: namespaceName,
            labels: namespaceLabels
        }
    };

    local tls = util.getTLSConfig(fullyQualifiedName, hosts);
    local ingress = {
        apiVersion: 'extensions/v1beta1',
        kind: 'Ingress',
        metadata: {
            name: fullyQualifiedName,
            namespace: namespaceName,
            labels: labels,
            annotations: annotations + tls.ingressAnnotations + {
                'kubernetes.io/ingress.class': 'nginx',
                'nginx.ingress.kubernetes.io/ssl-redirect': 'true'
            }
        },
        spec: {
            tls: [ tls.spec + { hosts: hosts } ],
            rules: [
                {
                    host: host,
                    http: {
                        paths: [
                            {
                                backend: {
                                    serviceName: fullyQualifiedName,
                                    servicePort: proxyPort
                                }
                            }
                        ]
                    }
                } for host in hosts
            ]
        }
    };

    local deployment = {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            labels: labels,
            name: fullyQualifiedName,
            namespace: namespaceName,
            annotations: annotations + {
                'kubernetes.io/change-cause': cause
            }
        },
        spec: {
            revisionHistoryLimit: 3,
            replicas: numReplicas,
            selector: {
                matchLabels: selectorLabels
            },
            template: {
                metadata: {
                    name: fullyQualifiedName,
                    namespace: namespaceName,
                    labels: podLabels,
                    annotations: annotations
                },
                spec: {
                    # This block tells the cluster that we'd like to make sure
                    # each instance of your application is on a different node. This
                    # way if a node goes down, your application doesn't:
                    # See: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#node-isolation-restriction
                    affinity: {
                        podAntiAffinity: {
                            requiredDuringSchedulingIgnoredDuringExecution: [
                                {
                                   labelSelector: {
                                        matchExpressions: [
                                            {
                                                    key: labelName,
                                                    operator: "In",
                                                    values: [ antiAffinityLabels[labelName], ],
                                            } for labelName in std.objectFields(antiAffinityLabels)
                                       ],
                                    },
                                    topologyKey: "kubernetes.io/hostname"
                                },
                            ]
                        },
                    },
                    nodeSelector: nodeSelector,
                    containers: [
                        {
                            name: fullyQualifiedName + '-api',
                            image: apiImage,
                            args: [ 'start.py', '--prod' ],
                            # The "probes" below allow Kubernetes to determine
                            # if your application is working properly.
                            #
                            # The readinessProbe is used to determine if
                            # an instance of your application can accept live
                            # requests. The configuration below tells Kubernetes
                            # to stop sending live requests to your application
                            # if it returns 3 non 2XX responses over 30 seconds.
                            # When this happens the application instance will
                            # be taken out of rotation and given time to "catch-up".
                            # Once it returns a single 2XX, Kubernetes will put
                            # it back in rotation.
                            #
                            # Kubernetes also has a livenessProbe that can be used to restart
                            # deadlocked processes. You can find out more about it here:
                            # https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command
                            #
                            # We don't use a livenessProbe as it's easy to cause unnecessary
                            # restarts, which can be really disruptive to a site's availability.
                            # If you think your application is likely to be unstable after running
                            # for long periods send a note to reviz@allenai.org so we can work
                            # with you to craft the right livenessProbe.
                            readinessProbe: {
                                httpGet: apiHealthCheck + {
                                    path: '/?check=readiness_probe'
                                },
                                periodSeconds: 10,
                                failureThreshold: 3
                            },
                            # This tells Kubernetes what CPU and memory resources your API needs.
                            # We set these values low by default, as most applications receive
                            # bursts of activity and accordingly don't need dedicated resources
                            # at all times.
                            #
                            # Your application will be allowed to use more resources than what's
                            # specified below. But your application might be killed if it uses
                            # more than what's requested. If you know you need more memory
                            # or that your workload is CPU intensive, consider increasing the
                            # values below.
                            #
                            # For more information about these values, and the current maximums
                            # that your application can request, see:
                            # https://skiff.allenai.org/resources.html
                            resources: {
                                requests: {
                                    cpu: 0.1,
                                    memory: '500M'
                                },
                                limits: { }
                                   + gpuLimits # only the first container should have gpuLimits applied
                            }
                        },
                        {
                            name: fullyQualifiedName + '-proxy',
                            image: proxyImage,
                            readinessProbe: {
                                httpGet: proxyHealthCheck + {
                                    path: '/?check=rdy'
                                }
                            },
                            resources: {
                                requests: {
                                   cpu: 0.1,
                                   memory: '100M'
                                }
                            }
                        }
                    ]
                }
            }
        }
    };

    local service = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: fullyQualifiedName,
            namespace: namespaceName,
            labels: labels,
            annotations: annotations
        },
        spec: {
            selector: selectorLabels,
            ports: [
                {
                    port: proxyPort,
                    name: 'http'
                }
            ]
        }
    };

    [
        namespace,
        ingress,
        deployment,
        service
    ]
