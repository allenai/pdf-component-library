import * as React from 'react';
import SimpleZoomControl from './SimpleZoomControl';

type Props = {
  scale: number,
  handleZoom: (multiplier: number) => void,
};

export default class Header extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        I'm  a header!<br/>
        <SimpleZoomControl scale={this.props.scale} onScale={this.props.handleZoom}/>
      </div>
    );
  }
}
