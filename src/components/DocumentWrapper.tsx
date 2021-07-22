import * as React from 'react';
import { DocumentProps } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';

type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export class DocumentWrapper extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { children, ...rest } = this.props;
    return (
      <Document options={/*{ cMapUrl: 'cmaps/', cMapPacked: true }*/ undefined} {...rest}>
        {children}
      </Document>
    );
  }
}
