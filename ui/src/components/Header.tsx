import * as React from 'react';

import { SimpleZoomControl } from './SimpleZoomControl';

// TODO: #28926 Update handlers to use context vars instead of props
type Props = {
  handleToggleHighlightOverlay: () => void;
  handleToggleHighlightText: () => void;
  handleShowOutline: () => void;
  handleRotateCW: () => void;
  handleRotateCCW: () => void;
  handleScrollToFigure: () => void;
};

export class Header extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <div className="reader__header">
        <div className="header-control">
          <SimpleZoomControl />
        </div>
        <div className="header-control">
          Rotate
          <a onClick={this.props.handleRotateCW}>↷</a>
          <a onClick={this.props.handleRotateCCW}>↶</a>
        </div>
        <div className="header-control">
          <a onClick={this.props.handleShowOutline}>Outline</a>
        </div>
        <div className="header-control">
          <a onClick={this.props.handleToggleHighlightOverlay}>Highlight Overlay</a>
        </div>
        <div className="header-control">
          <a onClick={this.props.handleToggleHighlightText}>Highlight Text</a>
        </div>
        <div className="header-control">
          <a onClick={this.props.handleScrollToFigure}>Scroll to Figure 1</a>
        </div>
      </div>
    );
  }
}
