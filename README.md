# Pdf-component-library

## Overview
The Pdf-Component-Library provides the means of displaying PDF’s in your React application with several built in reading features. It is built on top of the [React-PDF library](https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md), with some added components to help with creating an interactive reading experience. This library is built with research papers in mind, and aims at providing researchers with helpful tools to help their reading experience. It allowed us to create the [Semantic Reader](https://www.semanticscholar.org/product/semantic-reader) which you can demo [here](https://www.semanticscholar.org/reader/13497bd108d4412d02050e646235f456568cf822)

## Features
- Citation Popovers
- PDF Outlines
- Thumbnails
- Zoom Buttons
- Page number control
- Text highlighting
- Hypothesis.io integration for note taking
- Scroll-to logic
- Browser performance optimization

## How does it work?
We render each pdf page with several layers in order to display and render interactable components. First an image is generated of each PDF page, which is used for a background image on the bottom most layer. Then we place a transparent “text layer” in front of the background image. The text layer allows for text selection, copy/pasting, and highlighting. Above the text layer is the overlay layer. The overlay is where most of the interactive features are located, such as page highlights and citation popovers. 

## When to use PDF-Component-Library
You should use this library if you want a React based application with an emphasis on PDF reading. I recommend first glossing over the [React-PDF library](https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md), then if you decide you like that library and want several added features to help with creating an interactive PDF experience, then try our library. 

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

#### Building/Modifying the library
Want to make changes the library? Most code changes will go into `ui/library` directory. After making your changes, navigate to the `ui/library` directory and run `yarn build`. This will copy artifacts over to `ui/library/dist` folder. Run `npm pack` in this folder to create a package, for example `pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz`. You can then use this package in your projects by listing it in your `package.json` like so: 

```
"dependencies": {
    "@allenai/pdf-components": "file:~/pdf-component-library/ui/library/dist/allenai-pdf-components-0.2.3.tgz"
}
```
Make sure to re-install your package after this update via `yarn install` or `npm install`

If this is the first time building the library, you might have to follow the steps listed in this [Docker](ui/Dockerfile) file to install the dependencies.

## Components / Contexts

| Name | Description |
| --------- | ----------- |
| DocumentWrapper | Loads the pdf file, and does several necessary initialization code such as setting scroll observers and setting the render type. It servers as a wrapper for the react-pdf [Document](https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md#document) component |
| PageWrapper | Renders a page, should be placed in the `<DocumentWrapper />` |
| ContextProvider | Contains several necessary contexts which I will go into below. These contexts help us control and get data from the pdf which allows us to create several of the features.  |
| DocumentContext | Has helpful info about the pdf including the number of pages, the pdf outline (table of contents), and the page dimensions.  |
| TransformContext | Allows setting the scale of pages (zoom), and the rotation |
| UIContext | Helpful ui info such as if the pdf is currently loading and if thumbnails/outlines/highlights are currently showing.  |
| ScrollContext | By far our most complex and worked on context. It provides scroll logic and scroll data, including if at the top of the pdf, how many pages are currently visible, and functionality to scroll to certain parts of the pdf. This is all possible via Intersection Observers, which tell us if a certain spot is currently visible in the user’s viewport. We place several of these on every page so we know exactly how visible reader pages are. |
| PageRenderContext | Contains logic for rendering the images on every page. Once the page images are done rendering, you can grab the image’s blobURL via getObjectURLForPage and render anywhere like this <img src={getObjectURLForPage()} />. This is how we made thumbnails. |

### More info on the DocumentWrapper
This component is a wrapper of React-PDF's `Document` component. This loads a document passed using the `file` prop.<br>
When the Document is successfully loaded, The `isLoading` state in the `UiContext` is set to `false`. This does NOT mean that something has been rendered yet.<br>
The `isLoading` state in the `UiContext` is also set to `false` in case of an error while loading the document.

| Prop name | Description | Default value  | Example values |
| --------- | ----------- | -------------- | -------------- |
| className | Class name(s) that will be added to rendered element along with the default `react-pdf__Document`.                                             | n/a | <ul><li>String:<br />`"custom-class-name-1 custom-class-name-2"`</li><li>Array of strings:<br />`["custom-class-name-1", "custom-class-name-2"]`</li></ul>|
| file      | What PDF should be displayed.<br />Its value can be an URL, a file (imported using `import ... from ...` or from file input form element), or an object with parameters (`url` - URL; `data` - data, preferably Uint8Array; `range` - PDFDataRangeTransport; `httpHeaders` - custom request headers, e.g. for authorization), `withCredentials` - a boolean to indicate whether or not to include cookies in the request (defaults to `false`).<br />**Warning**: Since equality check (`===`) is used to determine if `file` object has changed, it must be memoized by setting it in component's state, `useMemo` or other similar technique. | n/a | <ul><li>URL:<br />`"http://example.com/sample.pdf"`</li><li>File:<br />`import sample from '../static/sample.pdf'` and then<br />`sample`</li><li>Parameter object:<br />`{ url: 'http://example.com/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }`</ul> |
| inputRef  | A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Document>` component. | n/a | <ul><li>Function:<br />`(ref) => { this.myDocument = ref; }`</li><li>Ref created using `React.createRef`:<br />`this.ref = React.createRef();`<br />…<br />`inputRef={this.ref}`</li><li>Ref created using `React.useRef`:<br />`const ref = React.useRef();`<br />…<br />`inputRef={ref}`</li></ul> |
| renderMode| Rendering mode of the document. Can be `"canvas"`, `"svg"` or `"none"`. | `"canvas"`| <ul><li>`"svg"`</li></ul> |

## License
This project is licensed under the Apache License 2.0.
