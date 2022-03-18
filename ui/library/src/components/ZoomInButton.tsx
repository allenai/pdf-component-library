import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export type Props = {
  children?: React.ReactNode;
};

export const ZoomInButton: React.FunctionComponent<Props> = ({
  children,
  ...extraProps
}: Props) => {
  const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

  const handleZoomIn = React.useCallback(
    (event): void => {
      event.preventDefault();
      event.stopPropagation();
      setScale(scale * zoomMultiplier);
    },
    [scale, zoomMultiplier]
  );

  return (
    <button className="reader__zoom-btn zoom-in" onClick={handleZoomIn} {...extraProps}>
      {children ? children : '+'}
    </button>
  );
};
