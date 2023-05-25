import { expect } from 'chai';
import * as React from 'react';

import { ArrowFlagBase } from '../../../src/components/marker/ArrowFlagBase';
import { mockDocumentContext } from '../../mock/MockDocumentContext';
import { mockTransformContext } from '../../mock/MockTransformContext';
import { mountWithContexts } from '../../testHelper';

describe('<ArrowFlagBase/>', () => {
  const mockFlagLabel = 'test';
  it('renders on its own successfully', () => {
    const wrapper = mountWithContexts(
      <ArrowFlagBase originTop={0} test-id="target" />,
      mockDocumentContext,
      mockTransformContext
    );

    const target = wrapper.find('[test-id="target"]');
    expect(target.exists()).to.be.true;
  });

  it('renders a tail only if label is not provided', () => {
    const wrapper = mountWithContexts(
      <ArrowFlagBase originTop={0} test-id="target" />,
      mockDocumentContext,
      mockTransformContext
    );

    const target = wrapper.find('[test-id="target"]');
    expect(target.exists('.pdf-reader__arrow-flag-base__tail'), 'tail should exist').to.be.true;
    expect(target.exists('.pdf-reader__arrow-flag-base__flag'), 'flag should not exist').to.be
      .false;
  });

  it('renders a flag and a tail if label is provided', () => {
    const wrapper = mountWithContexts(
      <ArrowFlagBase originTop={0} test-id="target" label={mockFlagLabel} />,
      mockDocumentContext,
      mockTransformContext
    );

    const target = wrapper.find('[test-id="target"]');
    expect(target.exists('.pdf-reader__arrow-flag-base__tail'), 'tail should exist').to.be.true;
    expect(target.exists('.pdf-reader__arrow-flag-base__flag'), 'flag should exist').to.be.true;
    expect(
      target.find('.pdf-reader__arrow-flag-base__flag').text(),
      'flag label is incorrect'
    ).to.equal(mockFlagLabel);
  });
});
