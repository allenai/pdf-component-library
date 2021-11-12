/*
 * PDF Component Library exports
 */

// Components

enum PageRotation {
    Rotate0 = 0,
    Rotate90 = 90,
    Rotate180 = 180,
    Rotate270 = 270,
}

function rotateClockwise(rotation: PageRotation): PageRotation {
    switch (rotation) {
        case PageRotation.Rotate0:
            return PageRotation.Rotate90;
        case PageRotation.Rotate90:
            return PageRotation.Rotate180;
        case PageRotation.Rotate180:
            return PageRotation.Rotate270;
        default:
            return PageRotation.Rotate0;
    }
}

/**
 * Tests whether the page is rotated 90 degrees clockwise or counterclockwise from zero,
 * e.g. whether the page "is rotated sideways."
 */
// function isSideways(rotation: PageRotation): boolean {
//     return rotation === PageRotation.Rotate90 || rotation === PageRotation.Rotate270;
// }

// Works w/ import Components from path (index)
// export default {
//     PageRotation,
//     rotateClockwise,
//     isSideways
// }

// export const rotateClockwise = test;

import { BoundingBox } from './BoundingBox';

import { isSideways, rotateCounterClockwise } from "./rotate";

export default { BoundingBox, rotateClockwise, rotateCounterClockwise, isSideways }