import * as React from 'react';

import { DocumentContext } from '../../context/DocumentContext';
import { TransformContext } from '../../context/TransformContext';
import { scrollToPosition } from '../../utils/scroll';
import { NodeDestination, OutlineNode } from '../types/Outline';
import { OutlineItem } from './OutlineItem';
import Ref from './Ref';

export const Outline: React.FunctionComponent = () => {
  const { pdfDocProxy } = React.useContext(DocumentContext);
  const { rotation } = React.useContext(TransformContext);
  const [outline, setOutline] = React.useState<Array<OutlineNode>>();

  React.useEffect(() => {
    if (!pdfDocProxy) {
      return;
    }

    if (!outline) {
      pdfDocProxy.getOutline().then((outlineArray: Array<OutlineNode>) => {
        setOutline(outlineArray);
      });
    }
  }, [pdfDocProxy]);

  const clickHandler = (dest: NodeDestination): void => {
    if (!dest || !pdfDocProxy) {
      return;
    }

    pdfDocProxy.getDestination(dest.toString()).then(destArray => {
      /*
        destArray returned by getDestination contains 5 items:
        1. Reference to the page where dest locates at
        2. Types of dest; currently only "XYZ" is handled
        3. X -- the distance from the left edge of a page to dest, measured in points
        4. Y -- the distance from the bottom edge of a page to dest, measured in points
        5. Scale
        
        Reference: https://github.com/mozilla/pdf.js/blob/d3e1d7090ac6f582d0c277e8768ac63bbbaa1134/web/base_viewer.js#L1152
      */
      // The second and the fifth items are left out intentionally for not being used in scrolling function.
      const [ref, , leftPoints, bottomPoints] = destArray;
      pdfDocProxy.getPageIndex(new Ref(ref)).then(refInfo => {
        scrollToPosition(parseInt(refInfo.toString()), leftPoints, bottomPoints, rotation);
      });
    });
  };

  return <div>{!!outline && <OutlineItem items={outline} onClick={clickHandler} />}</div>;
};
