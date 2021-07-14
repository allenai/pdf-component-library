import * as React from 'react';

import { SimpleZoomControl } from './SimpleZoomControl';

type Props = {
  scale: number;
  handleToggleHighlightOverlay: () => void;
  handleZoom: (multiplier: number) => void;
};

export class Header extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <div>
        I&apos;m a header!
        <br />
        <SimpleZoomControl scale={this.props.scale} onScale={this.props.handleZoom} />
        <button onClick={this.props.handleToggleHighlightOverlay}>Toggle Highlight Overlay</button>
      </div>
    );
  }
}
