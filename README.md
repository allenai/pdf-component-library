# Pdf-component-library

Create an interactive reading experience for PDF's in your react application! 

This repo is used and maintained by the Semantic Scholar team to create  [Semantic Reader](https://www.semanticscholar.org/reader/13497bd108d4412d02050e646235f456568cf822). It is built on top of [React-PDF](https://github.com/wojtekmaj/react-pdf/tree/main/packages/react-pdf), with some added features and performance improvements. 

## Features
- Citation Popovers
- PDF Outlines
- Thumbnails (React-PDF now has this with version 7)
- Zoom Buttons
- Page number control
- Text highlighting
- Hypothesis.io integration for note taking
- Scroll-to logic
- Browser performance optimization

## Getting Started
Install by executing `npm install @allenai/pdf-components`.
Refer to directory `ui/demo` for examples of how to import the components.

### Running the Demo Locally via Docker

In this demo, you will see several added features to the PDF reading experience. This includes Citation Cards, Thumbnails, Outlines, Zoom, and Notetaking. 

1. Download and install Docker
2. Download or clone the Pdf-Components-Library repo
3. In your terminal, navigate to `ui/demo` then run `docker-compose up --build`. This process launches 2 services, the `ui` and a `proxy` responsible
for forwarding traffic to the appropriate services. You'll see output from each.
4. Once docker is done running, you can access the demo on `http://localhost:8080/`


## Modifying the library
Made changes to the library and want to apply them to your own project? The below steps will help you build and apply your changes

#### Build the library
In the ui/library directory, run `yarn build`. If this is the first time building, you might have to follow the steps listed in this [Docker](ui/Dockerfile) file to install the dependencies.

#### Create a package
On building the library, the artifacts are copied over to `ui/library/dist` folder. Run `npm pack` in this folder. This creates a package. e.g. `pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz`

#### Point to your file
Update the `package.json` file of your application. Point to the file we produced in the previous step.
```
"dependencies": {
    "@allenai/pdf-components": "file:~/pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz"
}
```
Make sure to re-install your package after this update via `yarn install` or `npm install`
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
