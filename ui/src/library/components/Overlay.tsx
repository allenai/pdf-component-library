import * as React from 'react';
import { CitationPopover } from '../../components/CitationPopover';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { isSideways } from '../rotate';
import { BoundingBox } from './BoundingBox';

type Props = {
  children?: React.ReactElement | Array<React.ReactElement>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);
  const style = {
    width: isSideways(rotation) ? pageSize.height : pageSize.width * scale,
    height: isSideways(rotation) ? pageSize.width : pageSize.height * scale,
  };
  return (
    <div className="reader__page-overlay" style={style}>
      {children}
    </div>
  );
};
