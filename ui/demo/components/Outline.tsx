import { Drawer } from 'antd';
import * as React from 'react';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import PdfComponents from 'pdf-components';
// import { UiContext } from '../../library/context/UiContext';
// import { scrollToPdfPage } from '../../library/utils/scroll';

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};

export const Outline: React.FunctionComponent<Props> = ({ parentRef }: Props) => {
  const { isShowingOutline, setIsShowingOutline } = React.useContext(PdfComponents.UiContext);

  const handleHideOutline = React.useCallback(() => {
    setIsShowingOutline(false);
  }, []);

  // Click events from the Outline only give a pageNumber, not a pageIndex
  const handleOutlineClick = React.useCallback(({ pageNumber }: { pageNumber: string }) => {
    // Page IDs are based on index, so convert pageNumber to pageIndex before scrolling
    const pageIndex = convertPageNumberToPageIndex(Number.parseInt(pageNumber));
    PdfComponents.scrollToPdfPageIndex(pageIndex);
  }, []);

  // Convert from pageNumber to pageIndex
  // pageNumber is 1-indexed, pageIndex is 0-indexed
  // Returns -1 if if given a pageNumber <= 0
  function convertPageNumberToPageIndex(pageNumber: number): number {
    return Math.max(-1, pageNumber - 1);
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
