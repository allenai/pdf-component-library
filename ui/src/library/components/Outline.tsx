import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Drawer } from 'antd';
import * as React from 'react';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import { UIContext } from '../components/UIContext';
import { scrollToPdfPage } from '../scroll';

export const Outline: React.FunctionComponent = () => {
  const uiContext = React.useContext(UIContext);

  function handleOutlineClick({ pageNumber }: { pageNumber: string }): void {
    scrollToPdfPage(pageNumber);
  }

  function handleCloseDrawer(): void {
    uiContext.setIsDrawerOpen(false);
  }

  return (
    <Drawer
      title="Outline"
      placement="left"
      visible={uiContext.isDrawerOpen}
      mask={false}
      onClose={handleCloseDrawer}
      getContainer={`.${uiContext.drawerContainerClass}`}
      className="reader__outline-drawer">
      <PdfOutline onItemClick={handleOutlineClick} />
    </Drawer>
  );
};
