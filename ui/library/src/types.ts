export type Nullable<T> = T | null;

// Height and width are in screen pixel units at 100% scaling of the page
export type Dimensions = {
  height: number;
  width: number;
};

// Top and left are in screen pixel units at 100% scaling of the page
export type Origin = {
  top: number;
  left: number;
};

export type Size = Dimensions & Origin;

export type BoundingBox = {
  page: number;
} & Size;


export type Destination = Nullable<string> | any[];
export type OutlineNode = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray;
  dest: Destination;
  url: Nullable<string>;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: any[];
}
