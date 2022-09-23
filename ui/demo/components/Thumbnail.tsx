import { ThumbnailList, UiContext } from '@allenai/pdf-components';
import { Drawer } from 'antd';
import * as React from 'react';

type Props = {
  parentRef: React.RefObject<HTMLDivElement>;
};

export const Thumbnail: React.FunctionComponent<Props> = ({ parentRef }: Props) => {
  const { isShowingThumbnail, setIsShowingThumbnail } = React.useContext(UiContext);

  const handleHideThumbnail = React.useCallback(() => {
    setIsShowingThumbnail(false);
  }, []);

  return (
    <Drawer
      title="Thumbnail"
      placement="left"
      visible={isShowingThumbnail}
      mask={false}
      onClose={handleHideThumbnail}
      // Passing this ref mounts the drawer "inside" the grid content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getContainer={parentRef.current}
      className="reader__outline-drawer">
      <ThumbnailList />
    </Drawer>
  );
};
