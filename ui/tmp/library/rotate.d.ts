export declare enum PageRotation {
    Rotate0 = 0,
    Rotate90 = 90,
    Rotate180 = 180,
    Rotate270 = 270
}
export declare function rotateClockwise(rotation: PageRotation): PageRotation;
export declare function rotateCounterClockwise(rotation: PageRotation): PageRotation;
/**
 * Tests whether the page is rotated 90 degrees clockwise or counterclockwise from zero,
 * e.g. whether the page "is rotated sideways."
 */
export declare function isSideways(rotation: PageRotation): boolean;
