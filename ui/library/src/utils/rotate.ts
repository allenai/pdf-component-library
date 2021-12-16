export enum PageRotation {
  Rotate0 = 0,
  Rotate90 = 90,
  Rotate180 = 180,
  Rotate270 = 270,
}

export function rotateClockwise(rotation: PageRotation): PageRotation {
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

export function rotateCounterClockwise(rotation: PageRotation): PageRotation {
  switch (rotation) {
    case PageRotation.Rotate0:
      return PageRotation.Rotate270;
    case PageRotation.Rotate90:
      return PageRotation.Rotate0;
    case PageRotation.Rotate180:
      return PageRotation.Rotate90;
    default:
      return PageRotation.Rotate180;
  }
}

/**
 * Tests whether the page is rotated 90 degrees clockwise or counterclockwise from zero,
 * e.g. whether the page "is rotated sideways."
 */
export function isSideways(rotation: PageRotation): boolean {
  return rotation === PageRotation.Rotate90 || rotation === PageRotation.Rotate270;
}
