import * as React from 'react';

import { getStyleFromContext } from './PageSizeContext';

type Props = {
  className?: string;
  /**
   * top, left, height, and width are in screen pixel units
   * at 100% scaling of the page
   */
  top: number;
  left: number;
  height: number;
  width: number;
  onClick?: () => void;
};

export type BoundingBoxProps = Props;

export const BoundingBox: React.FunctionComponent<Props> = ({
  className,
  top,
  left,
  height,
  width,
  onClick,
}: Props) => {
  const componentClassName = ['reader__page-overlay__bounding-box', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={componentClassName}
      style={getStyleFromContext(top, left, height, width)}
      onClick={onClick}
    />
  );
};
