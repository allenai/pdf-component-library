import { Nullable } from './types';

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
