import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { isSideways } from '../rotate';
import { BoundingBox } from './BoundingBox';

type Props = {
  children?: React.ReactElement<typeof BoundingBox> | Array<React.ReactElement<typeof BoundingBox>>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);

  const style = {
    width: isSideways(rotation) ? pageDimensions.height : pageDimensions.width * scale,
    height: isSideways(rotation) ? pageDimensions.width : pageDimensions.height * scale,
  };

  return (
    <div className="reader__page-overlay" style={style}>
      {children}
    </div>
  );
};
