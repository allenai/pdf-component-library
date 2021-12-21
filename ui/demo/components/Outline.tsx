import { Drawer } from 'antd';
import { DocumentContext, Outline as PdfOutline, UiContext } from 'pdf-components-dist';
import * as React from 'react';

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};

export const Outline: React.FunctionComponent<Props> = ({ parentRef }: Props) => {
  const { pdfDocProxy } = React.useContext(DocumentContext);
  const { isShowingOutline, setIsShowingOutline } = React.useContext(UiContext);

  const handleHideOutline = React.useCallback(() => {
    setIsShowingOutline(false);
  }, []);

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
      {!!pdfDocProxy && <PdfOutline pdf={pdfDocProxy} />}
    </Drawer>
  );
};
