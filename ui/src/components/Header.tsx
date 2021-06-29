import * as React from 'react';
import SimpleZoomControl from './SimpleZoomControl';

type Props = {
  scale: number,
  handleZoom: (multiplier: number) => void,
};

export default class Header extends React.Component<Props> {
  onSearch = () => {
    console.log('hi!');
    // @ts-ignore -- window.find() should be supported despite not being standard
    window.find('',0,0,0,0,0,1);
  }

  render() {
    return (
      <div>
        I'm  a header!<br/>
        <SimpleZoomControl scale={this.props.scale} onScale={this.props.handleZoom}/>
      </div>
    );
  }
}
