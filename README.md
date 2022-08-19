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

### Testing changes to the library locally
There are times when you would want to test changes to the library locally without having to publish the package to npm.

#### Build the library
In the ui/library directory, run `yarn build`. 
```
library% yarn build
```
If this is the first time building, you might have to follow the steps listed in this [Docker](ui/Dockerfile) file to install the dependencies.

#### Create a package
On building the library, the artifacts are copied over to `ui/library/dist` folder. Run `npm pack` in this folder.
```
dist% npm pack
```
This creates a package.
e.g. `pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz`

#### Point to your file
Update the `package.json` file of your application. Point to the file we produced in the previous step.
```
"dependencies": {
    "@allenai/pdf-components": "file:~/pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz"
}
```
Make sure to re-install your package after this update
```
yarn install
```
or
```
npm install
```

## Prerequisites

Make sure that you have the latest version of [Docker 🐳](https://www.docker.com/get-started)
installed on your local machine.

## User guide
The PDF component library uses the [React-PDF](https://github.com/wojtekmaj/react-pdf) package

### DocumentWrapper
This component is a wrapper of React-PDF's `Document` component. This loads a document passed using the `file` prop.<br>
When the Document is successfully loaded, The `isLoading` state in the `UiContext` is set to `false`. This does NOT mean that something has been rendered yet.<br>
The `isLoading` state in the `UiContext` is also set to `false` in case of an error while loading the document.

#### Props
Refer to React-PDf's [user guild](https://github.com/wojtekmaj/react-pdf#document) for the complete list of props supported.

| Prop name | Description | Default value  | Example values |
| --------- | ----------- | -------------- | -------------- |
| className | Class name(s) that will be added to rendered element along with the default `react-pdf__Document`.                                             | n/a | <ul><li>String:<br />`"custom-class-name-1 custom-class-name-2"`</li><li>Array of strings:<br />`["custom-class-name-1", "custom-class-name-2"]`</li></ul>|
| file      | What PDF should be displayed.<br />Its value can be an URL, a file (imported using `import ... from ...` or from file input form element), or an object with parameters (`url` - URL; `data` - data, preferably Uint8Array; `range` - PDFDataRangeTransport; `httpHeaders` - custom request headers, e.g. for authorization), `withCredentials` - a boolean to indicate whether or not to include cookies in the request (defaults to `false`).<br />**Warning**: Since equality check (`===`) is used to determine if `file` object has changed, it must be memoized by setting it in component's state, `useMemo` or other similar technique. | n/a | <ul><li>URL:<br />`"http://example.com/sample.pdf"`</li><li>File:<br />`import sample from '../static/sample.pdf'` and then<br />`sample`</li><li>Parameter object:<br />`{ url: 'http://example.com/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }`</ul> |
| inputRef  | A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Document>` component. | n/a | <ul><li>Function:<br />`(ref) => { this.myDocument = ref; }`</li><li>Ref created using `React.createRef`:<br />`this.ref = React.createRef();`<br />…<br />`inputRef={this.ref}`</li><li>Ref created using `React.useRef`:<br />`const ref = React.useRef();`<br />…<br />`inputRef={ref}`</li></ul> |
| renderMode| Rendering mode of the document. Can be `"canvas"`, `"svg"` or `"none"`. | `"canvas"`| <ul><li>`"svg"`</li></ul> |

## License
This project is licensed under the Apache License 2.0.
