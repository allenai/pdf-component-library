import * as React from 'react';
import { DocumentProps } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';

type Props = {
  children?: React.ReactNode;
} & DocumentProps;

export const DocumentWrapper: React.FunctionComponent<Props> = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <Document options={{ cMapUrl: 'cmaps/', cMapPacked: true }} {...rest}>
      {children}
    </Document>
  );
}
