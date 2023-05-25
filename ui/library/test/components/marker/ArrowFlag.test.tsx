import { expect } from 'chai';
import * as React from 'react';

import { ArrowFlag } from '../../../src/components/marker/ArrowFlag';
import { ArrowFlagBase } from '../../../src/components/marker/ArrowFlagBase';
import { mockDocumentContext } from '../../mock/MockDocumentContext';
import { mockTransformContext } from '../../mock/MockTransformContext';
import { mountWithContexts } from '../../testHelper';

describe('<ArrowFlag/>', () => {
  const mockFlagLabel = 'test';

  it('renders on its own successfully', () => {
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.1,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} test-id="target" />,
      mockDocumentContext,
      mockTransformContext
    );

    const target = wrapper.find('[test-id="target"]');
    expect(target.exists()).to.be.true;
  });

  it('renders nothing if the list of bounding boxes is empty', () => {
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={[]} label={mockFlagLabel} test-id="target" />,
      mockDocumentContext,
      mockTransformContext
    );

    const target = wrapper.find('[test-id="target"]');
    expect(target.isEmptyRender()).to.be.true;
  });

  it('renders a flag mark on the left if the list of bounding boxes are all on the left', () => {
    /** To cover below case on a two column paper
     * F --**** ------
     * | ****** ------
     * | ***--- ------
     */
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.1,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.2,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.3,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const targetBase = wrapper.find(ArrowFlagBase);
    expect(targetBase, 'should have only 1 ArrowFlagBase component').to.have.lengthOf(1);
    expect(targetBase.prop('position'), 'position is not on the left').to.equal('LEFT');
    expect(targetBase.prop('label'), 'label not matched').to.equal(mockFlagLabel);
  });

  it('renders a flag mark on the right if the list of bounding boxes are all on the right', () => {
    /** To cover below case on a two column paper
     * ------ ****** F
     * ------ ****** |
     * ------ ***--- |
     */
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.1,
        left: 0.51,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.2,
        left: 0.51,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.3,
        left: 0.51,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const targetBase = wrapper.find(ArrowFlagBase);
    expect(targetBase, 'should have only 1 ArrowFlagBase component').to.have.lengthOf(1);
    expect(targetBase.prop('position'), 'position is not on the right').to.equal('RIGHT');
    expect(targetBase.prop('label'), 'label not matched').to.equal(mockFlagLabel);
  });

  it('renders a flag mark on the left and a tail on the right if bounding boxes span over two columns', () => {
    /** To cover below case on a two column paper
     *   ------ ***--- |
     *   ------ ------
     * F -***** ------
     * | ****** ------
     */
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.8,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.9,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.1,
        left: 0.51,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const targetBases = wrapper.find(ArrowFlagBase);
    expect(targetBases, 'should have 2 ArrowFlagBase components').to.have.lengthOf(2);
    expect(targetBases.at(0).prop('position'), 'position is not on the left').to.equal('LEFT');
    expect(targetBases.at(0).prop('label'), 'label should appear on the left flag').to.equal(
      mockFlagLabel
    );
    expect(targetBases.at(1).prop('position'), 'position is not on the right').to.equal('RIGHT');
    expect(targetBases.at(1).prop('label'), 'the right flag should have no label').to.be.undefined;
  });

  it('renders a flag on the left if there are only 2 bounding boxes where one on the right and one on the left on a single-column paper', () => {
    /** To cover below case on a single column paper
     *   ------c------
     * F ------c---***
     * | ****--c------
     */
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.8,
        left: 0.6,
        height: 0.1,
        width: 0.3,
      },
      {
        page: 0,
        top: 0.9,
        left: 0.1,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const targetBase = wrapper.find(ArrowFlagBase);
    expect(targetBase, 'should have 1 ArrowFlagBase components').to.have.lengthOf(1);
    expect(targetBase.prop('position'), 'position is not on the left').to.equal('LEFT');
    expect(targetBase.prop('label'), 'label should appear on the left flag').to.equal(
      mockFlagLabel
    );
  });

  it('renders a flag on the left and a tail on the right if there are only 2 bounding boxes where one on the right and one on the left. The vertical distance between them are over 1 row on a two-column paper', () => {
    /** To cover below case on a two column paper
     *   ------ ****-- |
     *   ------ ------
     * F ---*** ------
     */
    const mockBoundingBoxes = [
      {
        page: 0,
        top: 0.9,
        left: 0.2,
        height: 0.1,
        width: 0.2,
      },
      {
        page: 0,
        top: 0.2,
        left: 0.51,
        height: 0.1,
        width: 0.2,
      },
    ];
    const wrapper = mountWithContexts(
      <ArrowFlag boundingBoxes={mockBoundingBoxes} label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const targetBases = wrapper.find(ArrowFlagBase);
    expect(targetBases, 'should have 2 ArrowFlagBase components').to.have.lengthOf(2);
    expect(targetBases.at(0).prop('position'), 'position is not on the left').to.equal('LEFT');
    expect(targetBases.at(0).prop('label'), 'label should appear on the left flag').to.equal(
      mockFlagLabel
    );
    expect(targetBases.at(1).prop('position'), 'position is not on the right').to.equal('RIGHT');
    expect(targetBases.at(1).prop('label'), 'the right flag should have no label').to.be.undefined;
  });
});
