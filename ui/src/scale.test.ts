import { computePageWidthPx } from "./scale";

describe('computePageWidthPx', () => {
  it('computes pixel width of the PDF', () => {
    const output = computePageWidthPx(1, [0, 0, 612, 800]);
    expect(output).toEqual(816);
  });
});
