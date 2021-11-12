import * as React from 'react';
import { BoundingBox as BoundingBoxType } from './types';
declare type Props = {
    className?: string;
    id?: string;
    isHighlighted?: boolean;
    onClick?: () => void;
} & BoundingBoxType;
export declare type BoundingBoxProps = Props;
export declare const BoundingBox: React.FunctionComponent<Props>;
export {};
