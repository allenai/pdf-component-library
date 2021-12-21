import classnames from 'classnames';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import * as React from 'react';

import { Destination, OutlineNode } from '../../types';
import { scrollToPosition } from '../../utils/scroll';
import { OutlineItem } from './OutlineItem';
import Ref from './Ref';

type Props = {
  pdf: PDFDocumentProxy;
  className?: string;
};

export const Outline: React.FunctionComponent<Props> = ({ pdf, className }: Props) => {
  const [outline, setOutline] = React.useState<Array<OutlineNode>>();

  pdf.getOutline().then((outlineArray: Array<OutlineNode>) => {
    if (!outline) setOutline(outlineArray);
  });

  function clickHandler(dest: Destination) {
    if (!dest) return;
    pdf.getDestination(dest.toString()).then(destArray => {
      /*
        destArray returned by getDestination contains 5 items:
        1. Reference to the page where dest locates at
        2. Type of dest; currently only "XYZ" is handled
        3. X -- distance from left measured in points
        4. Y -- distance from bottom measured in points
        5. Scale
        
        Reference: https://github.com/mozilla/pdf.js/blob/d3e1d7090ac6f582d0c277e8768ac63bbbaa1134/web/base_viewer.js#L1152
      */
      const [ref, , leftPoints, bottomPoints] = destArray;
      pdf.getPageIndex(new Ref(ref)).then(refObj => {
        scrollToPosition(parseInt(refObj.toString()), leftPoints, bottomPoints);
      });
    });
  }

  return (
    <div className={classnames('react-pdf__Outline', className)}>
      {!!outline && <OutlineItem items={outline} onClick={clickHandler} />}
    </div>
  );
};
