import { expect } from 'chai';

import { getMaxVisibleElement } from '../../src/utils/MaxVisibleElement';

describe('MaxVisibleElement', () => {
  const map = new Map();
  map.set(1, { ratio: 0.00123 });
  map.set(2, { ratio: 0.012567 });
  map.set(3, { ratio: 0.2 });

  it('should return the correct key of the max visible element when getMaxVisibleElement get called', () => {
    const maxVisibleElement = getMaxVisibleElement(map);
    expect(maxVisibleElement).to.equal(3);
  });
});
