# pdf-component-library

This repository contains code for a collection of components that can be used to build PDF reading experiences for React applications. 

## Getting Started
Install by executing `npm install @allenai/pdf-components`.
Refer to directory `ui/demo` for examples of how to import the components.

### Running the Demo Locally
To start a version of the application locally for development purposes, run
this command:

```
~ docker-compose up --build
```

This process launches 2 services, the `ui` and a `proxy` responsible
for forwarding traffic to the appropriate services. You'll see output
from each.

It might take a minute or two for your application to start, particularly
if it's the first time you've executed this command. Be patience and wait
for a clear message indicating that all of the required services have
started up.

As you make changes the running application will be automatically updated.
Simply refresh your browser to see them.

Sometimes one portion of your application will crash due to errors in the code.
When this occurs resolve the related issue and re-run `docker-compose up --build`
to start things back up.

## Prerequisites

Make sure that you have the latest version of [Docker 🐳](https://www.docker.com/get-started)
installed on your local machine.

## License
This project is licensed under the Apache License 2.0.
