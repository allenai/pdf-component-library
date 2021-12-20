
import { Destination, OutlineNode } from '../../types';
import { OutlineItem } from './OutlineItem';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { scrollToPosition } from '../../utils/scroll';
import Ref from './Ref'

import * as React from 'react';
import classnames from 'classnames';

type Props = {
  pdf: PDFDocumentProxy,
  className?: string
};

export const Outline: React.FunctionComponent<Props> = ({pdf, className}) => {
  const [ outline, setOutline ] = React.useState<Array<OutlineNode>>();

  pdf.getOutline().then((outlineArray: Array<OutlineNode>) => {
    if (!outline)
      setOutline(outlineArray)
  })

  function clickHandler (dest: Destination) {
    pdf.getDestination(dest!.toString()).then(destArr => {
      const [ref, posType, leftPoints, bottomPoints] = destArr;
      pdf.getPageIndex(new Ref(ref)).then(refObj => {
        scrollToPosition(parseInt(refObj.toString()), leftPoints, bottomPoints);
      })
    })
  }

  return (
    <div className={classnames('react-pdf__Outline', className)}>
      {!!outline && <OutlineItem items={outline} onClick={clickHandler}/>}
    </div>
  );
}
