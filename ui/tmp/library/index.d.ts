/// <reference types="react" />
declare enum PageRotation {
    Rotate0 = 0,
    Rotate90 = 90,
    Rotate180 = 180,
    Rotate270 = 270
}
declare function rotateClockwise(rotation: PageRotation): PageRotation;
import { isSideways, rotateCounterClockwise } from "./rotate";
declare const _default: {
    BoundingBox: import("react").FunctionComponent<{}>;
    rotateClockwise: typeof rotateClockwise;
    rotateCounterClockwise: typeof rotateCounterClockwise;
    isSideways: typeof isSideways;
};
export default _default;
