import React from 'react';

export const About = () => {
    return (
        <React.Fragment>
            <h1>Ahoy!</h1>
            <p>
                This is a fresh application derived from the{' '}
                <a href="https://github.com/allenai/skiff-template">Skiff Template</a>. Skiff
                provides a <a href="https://www.python.org/">Python</a> based API and a UI
                constructed with <a href="https://www.typescriptlang.org/">TypeScript</a>,{' '}
                <a href="https://reactjs.org/">ReactJS</a>, and{' '}
                <a href="https://github.com/allenai/varnish">Varnish</a>.
            </p>
            <p>
                It's deployed to a Google managed Kubernetes cluster and provides DNS, log
                aggregation, TLS and other capabilties out of the box, thanks to the{' '}
                <a href="https://github.com/allenai/skiff">Skiff</a> project.
            </p>
            <p>
                If you have any questions, concerns or feedback please don't hesitate to reach out.
                You can open a{' '}
                <a href="https://github.com/allenai/skiff-template/issues/new">Github Issue</a> or
                contact us at <a href="mailto:reviz@allenai.org">reviz@allenai.org</a>.
            </p>
            <p>Smooth sailing!</p>
        </React.Fragment>
    );
};
