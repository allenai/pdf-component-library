import * as React from 'react';

import { buildOutlinePositions, DocumentContext } from '../../context/DocumentContext';
import { ScrollContext } from '../../context/ScrollContext';
import { NodeDestination, OutlineNode } from '../types/outline';
import { OutlineItem } from './OutlineItem';

export const Outline: React.FunctionComponent = ({ ...extraProps }) => {
  const { outline, pdfDocProxy, setOutline, setOutlinePositions } =
    React.useContext(DocumentContext);
  const { scrollToOutlineTarget, resetScrollObservers } = React.useContext(ScrollContext);

  if (!pdfDocProxy) {
    return null;
  }

  React.useEffect(() => {
    if (outline) {
      return;
    }
    pdfDocProxy
      .getOutline()
      .then((outlineArray: Array<OutlineNode>) => {
        setOutline(outlineArray);
        return buildOutlinePositions(pdfDocProxy, outlineArray);
      })
      .then(outlinePositions => {
        setOutlinePositions(outlinePositions);
      })
      .then(() => {
        resetScrollObservers();
      });
  }, [outline]);

  const clickHandler = (dest: NodeDestination): void => {
    if (!dest) {
      return;
    }
    scrollToOutlineTarget(dest);
    return;
  };

  return (
    <div className="reader__outline" {...extraProps}>
      {!!outline && <OutlineItem items={outline} onClick={clickHandler} />}
    </div>
  );
};
