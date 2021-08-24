import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Drawer } from 'antd';
import * as React from 'react';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import { UiContext } from '../library/context/UiContext';
import { scrollToPdfPage } from '../library/scroll';

export const Outline: React.FunctionComponent = () => {
  const { isShowingOutline, outlineContainerClass, setIsShowingOutline } =
    React.useContext(UiContext);

  function handleOutlineClick({ pageNumber }: { pageNumber: string }): void {
    scrollToPdfPage(pageNumber);
  }

  function handleHideOutline(): void {
    setIsShowingOutline(false);
  }

  return (
    <Drawer
      title="Outline"
      placement="left"
      visible={isShowingOutline}
      mask={false}
      onClose={handleHideOutline}
      getContainer={`.${outlineContainerClass}`}
      className="reader__outline-drawer">
      <PdfOutline onItemClick={handleOutlineClick} />
    </Drawer>
  );
};
