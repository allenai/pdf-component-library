import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { isSideways } from '../rotate';
import { BoundingBox } from './BoundingBox';

type Props = {
  children?: React.ReactElement<typeof BoundingBox> | Array<React.ReactElement<typeof BoundingBox>>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);

  const computeStyle = React.useCallback(() => {
    return {
      width: isSideways(rotation) ? pageSize.height : pageSize.width * scale,
      height: isSideways(rotation) ? pageSize.width : pageSize.height * scale,
    };
  }, [rotation, scale, pageSize, pageSize.height, pageSize.width]);

  return (
    <div className="reader__page-overlay" style={computeStyle()}>
      {children}
    </div>
  );
};
