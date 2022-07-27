import * as React from 'react';

import { buildOutlinePositions, DocumentContext } from '../../context/DocumentContext';
import { ScrollContext } from '../../context/ScrollContext';
import { NodeDestination, OutlineNode } from '../types/outline';
import { OutlineItem } from './OutlineItem';

export const Outline: React.FunctionComponent = ({ ...extraProps }) => {
  const { outline, pdfDocProxy, setOutline, setOutlinePositions } =
    React.useContext(DocumentContext);
  const { scrollToOutlineTarget, resetScrollObservers } = React.useContext(ScrollContext);

  React.useEffect(() => {
    if (outline) {
      return;
    }

    if (!pdfDocProxy) {
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

  const clickHandler = React.useCallback((dest: NodeDestination): void => {
    if (!dest) {
      return;
    }
    scrollToOutlineTarget(dest);
    return;
  }, []);

  if (!pdfDocProxy) {
    return null;
  }

  return (
    <div className="reader__outline" {...extraProps}>
      {!!outline && <OutlineItem items={outline} onClick={clickHandler} />}
    </div>
  );
};
