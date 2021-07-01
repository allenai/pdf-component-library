//TODO: Split into multiple files once some kind of organization emerges
export type Nullable<T> = T | null;

export type Point = {
  x: number,
  y: number,
};

// TODO: augh this name is terrible, it's the data from react-pdf/pdfjs that
//       we need to compute the pixel size of the PDF's page(s).
export type PdfPageSizeData = {
  userUnit: number, // the default size of units in 1/72nds of an inch
  topLeft: Point,
  bottomRight: Point
};

export type PdfPixelSize = {
  height: number;
  width: number;
};

export const USER_UNIT_DENOMINATOR = 72; // the default size of units in 1/72nds of an inch
