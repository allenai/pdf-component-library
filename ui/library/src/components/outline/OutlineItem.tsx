import * as React from 'react';

import { Destination, OutlineNode } from '../../types';

type Props = {
  items?: Array<OutlineNode>;
  className?: string;
  onClick?: (dest: Destination) => void;
};

export const OutlineItem: React.FunctionComponent<Props> = ({
  items,
  className,
  onClick,
}: Props) => {
  if (!items || !items.length) return null;

  function renderItem(item: OutlineNode) {
    const clickHandler = (event: any) => {
      event.preventDefault();
      if (onClick) onClick(item.dest);
    };

    // If an item has sub titles, render <OutlineItem />
    return (
      <li key={item.title}>
        <a href="#" onClick={clickHandler}>
          {item.title}
        </a>
        <OutlineItem items={item.items} className={className} onClick={onClick} />
      </li>
    );
  }

  return <ul className={className}>{items.map(item => renderItem(item))}</ul>;
};
