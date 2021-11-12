import * as React from 'react';

import { BoundingBox as BoundingBoxType } from './types';

type Props = {
  className?: string;
  id?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
} & BoundingBoxType;

export type BoundingBoxProps = Props;

export const BoundingBox: React.FunctionComponent<Props> = ({
  id,
}: Props) => {

  return (
    <div id={id} className="bbox" />
  );
};
