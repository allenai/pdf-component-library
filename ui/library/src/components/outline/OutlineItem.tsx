import classnames from 'classnames';
import * as React from 'react';

import { ScrollContext } from '../../context/ScrollContext';
import { NodeDestination, OutlineNode } from '../types/outline';

type Props = {
  items?: Array<OutlineNode>;
  onClick?: (dest: NodeDestination) => void;
};

export const OutlineItem: React.FunctionComponent<Props> = ({ items, onClick }: Props) => {
  const { isOutlineTargetVisible } = React.useContext(ScrollContext);

  if (!items || !items.length) {
    return null;
  }

  function renderItem(item: OutlineNode) {
    const clickHandler = (event: any) => {
      event.preventDefault();
      if (onClick) {
        onClick(item.dest);
      }
    };

    // If an item has sub titles, render <OutlineItem />
    return (
      <li
        key={item.dest?.toString() || item.title}
        className={classnames('reader__outline-item', {
          'reader__outline-item--target-visible': isOutlineTargetVisible(item.dest),
        })}>
        <a href="#" onClick={clickHandler}>
          {item.title}
        </a>
        <OutlineItem items={item.items} onClick={onClick} />
      </li>
    );
  }

  return <ul className="reader__outline-items">{items.map(item => renderItem(item))}</ul>;
};
