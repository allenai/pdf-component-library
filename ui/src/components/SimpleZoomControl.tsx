import * as React from 'react';

type Props = {
  scale: number,
  onScale: (multiplier: number) => void,
};

export default function SimpleZoomControl({scale, onScale}: Props) {
  const handleScale = (multiplier: number) => {
    return () => onScale(multiplier);
  }
  const scaleFormatted = `${(scale / 1.0) * 100}%`;
  return (
    <span>
      <a className="hacky-zoom-button" onClick={handleScale(0.5)}>-</a>
      <span>{scaleFormatted}</span>
      <a className="hacky-zoom-button" onClick={handleScale(2)}>+</a>
    </span>
  );
};
