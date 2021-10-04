export type Nullable<T> = T | null;

/**
 * top, left, height, and width are in screen pixel units
 * at 100% scaling of the page
 */
export type Size = {
  top: number;
  left: number;
  height: number;
  width: number;
};

export type BoundingBox = {
  page: number;
} & Size;
