import { PageRotation } from '../../utils/rotate';
import { Dimensions } from './boundingBox';
import { Nullable } from './utils';

export type NodeDestination = Nullable<string> | any[];
export type OutlineNode = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray;
  dest: NodeDestination;
  url: Nullable<string>;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: any[];
};

export type OutlinePosition = {
  pageNumber: number;
  dest: string;
  leftPoint: number;
  bottomPoint: number;
};

export type OutlinePositionsByPageNumberMap = Map<number, OutlinePosition[]>;

export type OutlineTarget = {
  dest: string;
  leftPx: number;
  topPx: number;
};

export type OutlineTargetArgs = {
  pageNumber?: number;
  pageIndex?: number;
  scale: number;
  rotation: PageRotation;
  pageDimensions: Dimensions;
};
