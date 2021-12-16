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
