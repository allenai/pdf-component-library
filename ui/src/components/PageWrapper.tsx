import { generatePageId } from "../scroll";

import { Page } from "react-pdf/dist/esm/entry.webpack";
import { PageProps } from "react-pdf";
import * as React from "react";

// TODO: define a subset of PageProps to expose as this component's props
type Props = {} & PageProps;

export default class PageWrapper extends React.PureComponent<Props> {
  canvasRef = React.createRef<HTMLCanvasElement>();

  onClick = (e: any) => {
    console.log(e);
  }

  computeStyle = (): { width: number } | undefined => {
    const { width, scale } = this.props;
    // TODO: Do we need to be defensive here? Find a better way
    const theScale = scale || 1.0;
    if (!width) {
      return undefined;
    }
    return {
      width: width * theScale,
    };
  };

  render() {
    const { width, ...rest } = this.props;
    // Click events from the Outline only give pageNumber, so we need to be clever when setting the ID.
    const pageNumberForId = this.props.pageNumber ? this.props.pageNumber : (this.props.pageIndex ? this.props.pageIndex + 1 : 1);
    // Width needs to be set to prevent the outermost Page div from extending to fit the parent,
    // and mis-aligning the text layer.
    // TODO: Can we CSS this to auto-shrink?
    return (
      <div id={generatePageId(pageNumberForId)} className="reader__page" style={this.computeStyle()}>
        <Page width={width} {...rest} canvasRef={this.canvasRef} onClick={this.onClick} />
      </div>
    );
  }
}
