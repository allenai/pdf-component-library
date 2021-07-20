import * as React from 'react';

import { isSideways } from '../rotate';
import { BoundingBox } from './BoundingBox';
import { PageSizeContext } from './PageSizeContext';

type Props = {
  children?: React.ReactElement<typeof BoundingBox>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize, scale, rotation } = React.useContext(PageSizeContext);
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
