import * as React from 'react';

import { SimpleZoomControl } from './SimpleZoomControl';

// TODO: #28926 Update handlers to use context vars instead of props
type Props = {
  handleToggleHighlightOverlay: () => void;
  handleToggleHighlightText: () => void;
  handleOpenDrawer: () => void;
  handleRotateCW: () => void;
  handleRotateCCW: () => void;
};

export class Header extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <div>
        <SimpleZoomControl />
        <br />
        <a onClick={this.props.handleOpenDrawer}>Outline</a>
        <a onClick={this.props.handleRotateCW}>↷</a>
        <a onClick={this.props.handleRotateCCW}>↶</a>
        <br />
        <a onClick={this.props.handleToggleHighlightOverlay}>Highlight Overlay</a>
        <br />
        <a onClick={this.props.handleToggleHighlightText}>Highlight Text</a>
      </div>
    );
  }
}
