
import { Destination, OutlineNode } from '../../types';
import { DocumentContext } from '../../context/DocumentContext';
import { OutlineItem } from './OutlineItem';
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { scrollToId, scrollToPdfPageIndex } from '../../utils/scroll';
import { UiContext } from '../../context/UiContext';

import * as React from 'react';
import classnames from 'classnames';
import { Drawer } from 'antd';

type Props = {
  pdf: PDFDocumentProxy,
  parentRef: React.RefObject<HTMLDivElement> | React.LegacyRef<HTMLDivElement>,
  className?: string
};

export const Outline: React.FunctionComponent<Props> = ({pdf, parentRef, className}) => {

  const { isShowingOutline, setIsShowingOutline } = React.useContext(UiContext);
  const [ outline, setOutline ] = React.useState<Array<OutlineNode>>();

  pdf.getOutline().then((outlineArray: Array<OutlineNode>) => {
    if (!outline)
      setOutline(outlineArray)
  })

  // TODO
  function clickHandler (dest: Destination) {
    
    pdf.getDestination(dest!.toString()).then(kk => {
      console.log(kk)
    })
    // not working
    // scrollTo(dest!.toString())
  }

  const handleHideOutline = () => {
    setIsShowingOutline(false);
  };
  
  console.log("log", outline, parentRef)

  return (
    <Drawer
      title="Outline"
      placement="left"
      visible={isShowingOutline}
      mask={false}
      onClose={handleHideOutline}
      // Passing this ref mounts the drawer "inside" the grid content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getContainer={parentRef.current}
      className="reader__outline-drawer">
      <div className={classnames('react-pdf__Outline', className)}>
        {!!outline && <OutlineItem items={outline} onClick={clickHandler}/>}
      </div>
    </Drawer>
  );
}
