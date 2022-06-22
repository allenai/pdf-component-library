import { BoundingBox } from '@allenai/pdf-components';
import { BoundingBox as BoundingBoxType } from '@allenai/pdf-components/src/components/types/boundingBox';
import { Popover } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

import { usePDODContext } from './PDODContext';
import { Item } from './PDODTermLayer';

type Props = {
  item: Item;
  boundingBox: BoundingBoxType;
  parentRef: React.RefObject<HTMLElement>;
};

export const PDODPopover: React.FunctionComponent<Props> = ({
  parentRef,
  item,
  boundingBox,
}: Props) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const { setTerm } = usePDODContext();

  // Handler triggered when Ant Popover is shown or hidden

  const handleVisibleChange = React.useCallback(
    (isVisible: boolean) => {
      setIsPopoverVisible(isVisible);
      setTerm(item.text);
    },
    [item.text]
  );

  // TODO We dont really need a popup over for this project,
  // just a clickable Bounding Box
  return (
    <Popover
      // Passing this ref mounts the popover "inside" the scrollable content area
      // instead of using the entire browser height.
      //@ts-ignore there's something wonky with the types here
      getPopupContainer={() => parentRef.current}
      content={<pre>{JSON.stringify(item)}</pre>}
      trigger="click"
      onVisibleChange={handleVisibleChange}>
      <BoundingBox
        className={classNames('reader__popover__bbox', isPopoverVisible ? 'selected' : '')}
        page={boundingBox.page}
        top={boundingBox.top}
        left={boundingBox.left}
        height={boundingBox.height}
        width={boundingBox.width}
        isHighlighted={true}
      />
    </Popover>
  );
};
