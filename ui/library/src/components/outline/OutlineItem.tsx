import * as React from 'react';

import { NodeDestination, OutlineNode } from '../types/outline';

type Props = {
  items?: Array<OutlineNode>;
  onClick?: (dest: NodeDestination) => void;
};

export const OutlineItem: React.FunctionComponent<Props> = ({ items, onClick }: Props) => {
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
      <li key={item.title} className="reader__outline-item">
        <a href="#" onClick={clickHandler}>
          {item.title}
        </a>
        <OutlineItem items={item.items} onClick={onClick} />
      </li>
    );
  }

  return <ul className="reader__outline-items">{items.map(item => renderItem(item))}</ul>;
};
