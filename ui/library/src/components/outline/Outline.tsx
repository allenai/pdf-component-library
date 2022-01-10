import classnames from 'classnames';
import * as React from 'react';

import { DocumentContext } from '../../context/DocumentContext';
import { TransformContext } from '../../context/TransformContext';
import { scrollToPosition } from '../../utils/scroll';
import { NodeDestination, OutlineNode } from '../types/Outline';
import { OutlineItem } from './OutlineItem';
import Ref from './Ref';

type Props = {
  className?: string;
};

export const Outline: React.FunctionComponent<Props> = ({ className }: Props) => {
  const { pdfDocProxy } = React.useContext(DocumentContext);
  if (!pdfDocProxy) {
    return null;
  }

  const { rotation } = React.useContext(TransformContext);
  const [outline, setOutline] = React.useState<Array<OutlineNode>>();
  pdfDocProxy.getOutline().then((outlineArray: Array<OutlineNode>) => {
    if (!outline) {
      setOutline(outlineArray);
    }
  });

  const clickHandler = (dest: NodeDestination): void => {
    if (!dest) {
      return;
    }
    pdfDocProxy.getDestination(dest.toString()).then(destArray => {
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
      pdfDocProxy.getPageIndex(new Ref(ref)).then(refObj => {
        scrollToPosition(parseInt(refObj.toString()), leftPoints, bottomPoints, rotation);
      });
    });
  };

  return (
    <div className={classnames('react-pdf__Outline', className)}>
      {!!outline && <OutlineItem items={outline} onClick={clickHandler} />}
    </div>
  );
};
