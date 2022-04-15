import classNames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../context/DocumentContext';
import { TransformContext } from '../context/TransformContext';
import { computeBoundingBoxStyle } from '../utils/style';
import { BoundingBox as BoundingBoxType } from './types/boundingBox';

export type Props = {
  className?: string;
  id?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
} & BoundingBoxType;

export const BoundingBox: React.FunctionComponent<Props> = ({
  top,
  left,
  height,
  width,
  className,
  id,
  isHighlighted,
  onClick,
  ...extraProps
}: Props) => {
  const { pageDimensions } = React.useContext(DocumentContext);
  const { rotation, scale } = React.useContext(TransformContext);
  const boxSize = { top, left, height, width };
  const componentClassName = classNames(
    'reader__page-overlay__bounding-box',
    isHighlighted === true ? 'reader__page-overlay__bounding-box-highlighted' : '',
    className
  );

  const getBoundingBoxStyle = React.useCallback(() => {
    return computeBoundingBoxStyle(boxSize, pageDimensions, rotation, scale);
  }, [pageDimensions, rotation, scale]);

  const rotationClassName = React.useCallback(() => {
    return  `rotate${rotation}`;
  }, [rotation]);

  return (
    <React.Fragment>
      <div className={`reader__page-overlay__bounding-box-underline ${rotationClassName()}`} style={getBoundingBoxStyle()} />
      <div
        id={id}
        className={`${componentClassName} ${rotationClassName()}`}
        style={getBoundingBoxStyle()}
        onClick={onClick}
        {...extraProps}
      />
    </React.Fragment>
  );
};
