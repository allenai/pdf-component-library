import { TransformContext } from '@allenai/pdf-components';
import * as React from 'react';

import { PercentFormatter } from '../utils/format';

export const SimpleZoomControl: React.FunctionComponent = () => {
  const { scale, setScale } = React.useContext(TransformContext);
  const ZOOM_MULTIPLIER = 1.2;

  const handleZoomIn = React.useCallback(() => {
    setScale(scale * ZOOM_MULTIPLIER);
  }, [scale]);

  const handleZoomOut = React.useCallback(() => {
    setScale(scale / ZOOM_MULTIPLIER);
  }, [scale]);

  const renderLabel = React.useCallback(() => {
    return <span>{PercentFormatter.format(scale)}</span>;
  }, [scale]);

  return (
    <span>
      <a className="hacky-zoom-button" onClick={handleZoomOut}>
        -
      </a>
      {renderLabel()}
      <a className="hacky-zoom-button" onClick={handleZoomIn}>
        +
      </a>
    </span>
  );
};
