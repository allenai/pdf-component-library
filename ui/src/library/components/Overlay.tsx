import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { computePageStyle } from '../styleUtils';
import { BoundingBox } from './BoundingBox';

type Props = {
  children?: React.ReactElement<typeof BoundingBox> | Array<React.ReactElement<typeof BoundingBox>>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);

  const overlayStyle = React.useCallback(() => {
    return computePageStyle(pageDimensions, rotation, scale);
  }, [pageDimensions, rotation, scale]);

  return (
    <div className="reader__page-overlay" style={overlayStyle()}>
      {children}
    </div>
  );
};
