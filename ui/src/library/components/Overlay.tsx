import * as React from 'react';

import BoundingBox from './BoundingBox';
import { PageSizeContext } from './PageSizeContext';

type Props = {
  children: React.ReactElement<typeof BoundingBox>;
};

const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize, scale } = React.useContext(PageSizeContext);
  const style = {
    width: pageSize.width * scale,
    height: pageSize.height * scale,
  };
  return (
    <div className="reader__page-overlay" style={style}>
      {children}
    </div>
  );
};

export default Overlay;
