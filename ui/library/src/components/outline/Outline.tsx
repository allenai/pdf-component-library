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
    pdf.getDestination(dest!.toString()).then(destArray => {
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
