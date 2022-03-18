import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { computePageStyle } from '../utils/style';
import { BoundingBox } from './BoundingBox';

export type Props = {
  children?: React.ReactElement<typeof BoundingBox> | Array<React.ReactElement<typeof BoundingBox>>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children, ...extraProps }: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);

  const getOverlayStyle = React.useCallback(() => {
    return computePageStyle(pageDimensions, rotation, scale);
  }, [pageDimensions, rotation, scale]);

  return (
    <div className="reader__page-overlay" style={getOverlayStyle()} {...extraProps}>
      {children}
    </div>
  );
};
