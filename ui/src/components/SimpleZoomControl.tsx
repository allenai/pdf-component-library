import * as React from 'react';

import { PercentFormatter } from '../format';
import { PageSizeContext } from '../library/components/PageSizeContext';



export const SimpleZoomControl: React.FunctionComponent = () => {
  const { scale, setScale } = React.useContext(PageSizeContext);
  const ZOOM_MULTIPLIER = 1.2;

  const handleZoomIn = React.useCallback(
    event => {
      event.preventDefault();
      setScale(scale * ZOOM_MULTIPLIER);
    },
    [scale]
  );

  const handleZoomOut = React.useCallback(
    event => {
      event.preventDefault();
      setScale(scale * (1 / ZOOM_MULTIPLIER));
    },
    [scale]
  );

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
