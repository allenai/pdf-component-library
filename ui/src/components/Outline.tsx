import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Drawer } from 'antd';
import * as React from 'react';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import { UiContext } from '../library/context/UiContext';
import { scrollToPdfPage } from '../library/scroll';

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};

export const Outline: React.FunctionComponent<Props> = ({ parentRef }: Props) => {
  const { isShowingOutline, setIsShowingOutline } = React.useContext(UiContext);

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
      // Passing this ref mounts the drawer "inside" the grid content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getContainer={parentRef.current}
      className="reader__outline-drawer">
      <PdfOutline onItemClick={handleOutlineClick} />
    </Drawer>
  );
};
