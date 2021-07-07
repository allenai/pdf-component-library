import * as React from 'react';

import { BoundingBox } from './BoundingBox';
import { PageSizeContext } from './PageSizeContext';

type Props = {
  children: React.ReactElement<typeof BoundingBox>;
};

export const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize, scale } = React.useContext(PageSizeContext);
  return (
    <svg
      className="reader__page-overlay"
      width={pageSize.width * scale}
      height={pageSize.height * scale}>
      {children}
    </svg>
  );
};
