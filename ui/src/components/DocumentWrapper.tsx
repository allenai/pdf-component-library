import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { DocumentProps } from 'react-pdf';
import * as React from 'react';

type Props = {

} & DocumentProps;

export default class DocumentWrapper extends React.PureComponent<Props> {

  render() {
    const {children, options, ...rest} = this.props;
    return (
      <Document options={{ cMapUrl: 'cmaps/', cMapPacked: true }} {...rest}>
        {children}
      </Document>
    );
  }
}
