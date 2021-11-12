export declare type Nullable<T> = T | null;
export declare type Dimensions = {
    height: number;
    width: number;
};
export declare type Origin = {
    top: number;
    left: number;
};
export declare type Size = Dimensions & Origin;
export declare type BoundingBox = {
    page: number;
} & Size;
