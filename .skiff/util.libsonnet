/**
 * This file contains a few helper methods that are used in webapp.jsonnet.
 * They're put here as to not distract the reader from the stuff that really matters --
 * that is the code that produces their application's configuration.
 */
{
    local util = self,

    isCustomHost(host):
        if !std.endsWith(host, '.apps.allenai.org') then
            true
        else if std.length(std.split(host, '.')) != 4 then
            true
        else
            false,

    hasCustomHost(hosts):
        std.length(std.filter(util.isCustomHost, hosts)) > 0,

    /**
     * Returns a list of hostnames, given the provided environment identifier and Skiff application
     * configuration.
     */
    getHosts(env, config):
        local tld = '.apps.allenai.org';
        local defaultHosts =
            if env == 'prod' then
                [ config.appName + tld ]
            else
                [ config.appName + '-' + env + tld ];
        if (
            env == 'prod' &&
            'customDomains' in config &&
            std.isArray(config.customDomains) &&
            std.length(config.customDomains) > 0
        ) then
            defaultHosts + config.customDomains
        else
            defaultHosts,

    /**
     * Returns a few TLS related constructs given the provided hosts. If the application is
     * only using direct subdomains of `.apps.allenai.org` then an empty configuration is provided,
     * as the wildcard certificate that's managed by Skiff Bermuda can be used instead.
     */
    getTLSConfig(fqn, hosts): {
        local needsTLSCert = util.hasCustomHost(hosts),

        ingressAnnotations:
            if needsTLSCert then
                { 'cert-manager.io/cluster-issuer': 'letsencrypt-prod' }
            else {},
        spec:
            if needsTLSCert then
                { secretName: fqn + '-tls' }
            else
                {},
    }

}

