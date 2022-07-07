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
  const { term, setTerm } = usePDODContext();

  // Handler triggered when Ant Popover is shown or hidden

  const handleClick = React.useCallback(
    () => {
      setTerm(old => item.text === old ? false : item.text);
    },
    [item.text]
  );

  // TODO We dont really need a popup over for this project,
  // just a clickable Bounding Box
  const renderPopoverContent = React.useCallback(() => {
    return (
      <div className="reader__popover__citation">
        <pre>{JSON.stringify(item)}</pre>
      </div>
    );
  }, [item]);

  return (
    <BoundingBox
      className={classNames('reader__popover__bbox', term === item.text ? 'selected' : '')}
      onClick={handleClick}
      page={boundingBox.page}
      top={boundingBox.top}
      left={boundingBox.left}
      height={boundingBox.height}
      width={boundingBox.width}
      isHighlighted={true}
    />
  );
};
