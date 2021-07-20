import * as React from 'react';

import { SimpleZoomControl } from './SimpleZoomControl';

type Props = {
  scale: number;
  handleToggleHighlightOverlay: () => void;
  handleZoom: (multiplier: number) => void;
  handleOpenDrawer: () => void;
  handleRotateCW: () => void;
  handleRotateCCW: () => void;
};

export class Header extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <div>
        I&apos;m a header!
        <br />
        <SimpleZoomControl scale={this.props.scale} onScale={this.props.handleZoom} />
        <br />
        <a onClick={this.props.handleOpenDrawer}>Outline</a>
        <a onClick={this.props.handleRotateCW}>↷</a>
        <a onClick={this.props.handleRotateCCW}>↶</a>
        <br />
        <a onClick={this.props.handleToggleHighlightOverlay}>Highlight Overlay</a>
      </div>
    );
  }
}
