import * as React from 'react';

import { PageSizeContext } from './PageSizeContext';

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
  const { scale } = React.useContext(PageSizeContext);
  const style = {
    top: top * scale,
    left: left * scale,
    height: height * scale,
    width: width * scale,
  };
  const componentClassName = ['reader__page-overlay__bounding-box', className]
    .filter(Boolean)
    .join(' ');
  return <div className={componentClassName} style={style} onClick={onClick} />;
};
