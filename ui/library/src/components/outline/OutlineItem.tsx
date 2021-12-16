import { Destination, OutlineNode } from '../../types';

import * as React from 'react';

type Props = {
  items?: Array<OutlineNode>,
  className?: string,
  onClick?: (dest: Destination) => void,
}

export const OutlineItem: React.FunctionComponent<Props> = ({items, className, onClick}) => 
{
  if (!items || !items.length)
    return null;

  function renderItem(item: OutlineNode) {
    const onItemClicked = (event: any) => {
      event.preventDefault();
      if (!!onClick)
        onClick(item.dest)
    }
    return (
      <li key={item.title}>
        <a href="#" onClick={onItemClicked}>
          {item.title}
        </a>
        <OutlineItem items={item.items} className={className} onClick={onClick}/>
      </li>
    );
  }
  
  return (
    <ul className={className}>
      {items.map(item => renderItem(item))}
    </ul>
  )
}
