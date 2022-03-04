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

## User guide
### DocumentWrapper
TODO

### PageWrapper
Displays a page. Should be placed inside `<DocumentWrapper />`. Alternatively, it can have `pdf` prop passed, which can be obtained from `<DocumentWrapper />`'s `onLoadSuccess` callback function, however some advanced functions like linking between pages inside a document may not be working correctly.

#### Props
| Prop name               | Description                                                                                                                                                                                                                                                                                      | Default value                                 | Example values                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className          | Class name(s) that will be added to rendered element along with the default.                                                        | n/a                                                   | <ul><li>String:<br />`"custom-class-name-1 custom-class-name-2"`</li><li>Array of strings:<br />`["custom-class-name-1", "custom-class-name-2"]`</li></ul>|
| error                   | What the component should display in case of an error.                                                          | `"Failed to load the page."`                  | <ul><li>String:<br />`"An error occurred!"`</li><li>React element:<br />`<div>An error occurred!</div>`</li><li>Function:<br />`this.renderError`</li></ul>|
 loading                 | What the component should display while loading.                                                       | `"Loading page…"`                             | <ul><li>String:<br />`"Please wait!"`</li><li>React element:<br />`<div>Please wait!</div>`</li><li>Function:<br />`this.renderLoader`</li></ul>|
 | noData                  | What the component should display in case of no data.                                                          | `"No page specified."`                        | <ul><li>String:<br />`"Please select a page."`</li><li>React element:<br />`<div>Please select a page.</div>`</li><li>Function:<br />`this.renderNoData`</li></ul>|
 | pageIndex               | Which page from PDF file should be displayed, by page index.| `0`                                           | `1` |
 | renderAnnotationLayer   | Whether annotations (e.g. links) should be rendered.                                                      | `true`                                        | `false`|
