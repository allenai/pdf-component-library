import { expect } from 'chai';

import {
  getClassNameSuffixFromRenderType,
  getRenderMode,
  RenderType,
} from '../../src/utils/reader-utils';

describe('getRenderMode()', () => {
  it('should return render mode to be canvas when render type is multi-canvas', () => {
    const renderType: RenderType = 'multi-canvas';
    expect(getRenderMode(renderType)).to.equals('canvas');
  });
  it('should return render mode to be none when render type is single-canvas', () => {
    const renderType: RenderType = 'single-canvas';
    expect(getRenderMode(renderType)).to.equals('none');
  });
});

describe('getClassNameSuffixFromRenderType', () => {
  it('should return single-canvas as a class name suffix based on render type', () => {
    const renderType: RenderType = 'single-canvas';
    expect(getClassNameSuffixFromRenderType(renderType)).to.equals('single-canvas');
  });

  it('should return multi-canvas as a class name suffix based on render type', () => {
    const renderType: RenderType = 'multi-canvas';
    expect(getClassNameSuffixFromRenderType(renderType)).to.equals('multi-canvas');
  });
});
