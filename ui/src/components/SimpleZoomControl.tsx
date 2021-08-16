import * as React from 'react';

import { PercentFormatter } from '../format';
import { TransformContext } from '../library/context/TransformContext';

export const SimpleZoomControl: React.FunctionComponent = () => {
  const { scale, setScale } = React.useContext(TransformContext);
  const ZOOM_MULTIPLIER = 1.2;

  const handleZoomIn = () => {
    setScale(scale * ZOOM_MULTIPLIER);
  };

  const handleZoomOut = () => {
    setScale(scale / ZOOM_MULTIPLIER);
  };

  return (
    <span>
      <a className="hacky-zoom-button" onClick={handleZoomOut}>
        -
      </a>
      <span>{PercentFormatter.format(scale)}</span>
      <a className="hacky-zoom-button" onClick={handleZoomIn}>
        +
      </a>
    </span>
  );
};
