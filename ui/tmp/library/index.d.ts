declare enum PageRotation {
    Rotate0 = 0,
    Rotate90 = 90,
    Rotate180 = 180,
    Rotate270 = 270
}
declare function rotateClockwise(rotation: PageRotation): PageRotation;
/**
 * Tests whether the page is rotated 90 degrees clockwise or counterclockwise from zero,
 * e.g. whether the page "is rotated sideways."
 */
declare function isSideways(rotation: PageRotation): boolean;
declare const _default: {
    rotateClockwise: typeof rotateClockwise;
    isSideways: typeof isSideways;
};
export default _default;
