import * as React from 'react';

import { PercentFormatter } from '../format';

type Props = {
  scale: number;
  onScale: (multiplier: number) => void;
};

const ZOOM_MULTIPLIER = 1.2;

export const SimpleZoomControl: React.FunctionComponent<Props> = ({ scale, onScale }: Props) => {
  const handleScale = (multiplier: number) => {
    return () => onScale(multiplier);
  };
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
