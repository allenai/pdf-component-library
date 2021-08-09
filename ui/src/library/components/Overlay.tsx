import * as React from 'react';

import { isSideways } from '../rotate';
import { BoundingBox } from './BoundingBox';
import { PageSizeContext } from '../context/PageSizeContext';
import { TransformContext } from '../context/TransformContext';

type Props = {
  children?: React.ReactElement<typeof BoundingBox>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize } = React.useContext(PageSizeContext);
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
