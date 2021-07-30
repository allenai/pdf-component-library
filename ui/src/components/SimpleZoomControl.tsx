import * as React from 'react';
import { MouseEventHandler } from 'react-router/node_modules/@types/react';

import { PercentFormatter } from '../format';
import { PageSizeContext } from '../library/components/PageSizeContext';

const { scale, setScale } = React.useContext(PageSizeContext);
const ZOOM_MULTIPLIER = 1.2;

export const SimpleZoomControl: React.FunctionComponent = () => {
  function handleScale(multiplier: number): MouseEventHandler {
    return () => {
      setScale(scale * multiplier);
    };
  }

  return (
    <span>
      <a className="hacky-zoom-button" onClick={handleScale(1 / ZOOM_MULTIPLIER)}>
        -
      </a>
      <span>{PercentFormatter.format(scale)}</span>
      <a className="hacky-zoom-button" onClick={handleScale(ZOOM_MULTIPLIER)}>
        +
      </a>
    </span>
  );
};
