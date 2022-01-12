import { expect } from 'chai';
import * as sinon from 'sinon';

import {
  generatePageIdFromIndex,
  PAGE_NAV_TARGET_ID_ROOT,
  SCROLLABLE_TARGET_DIV_CLASSNAME,
  scrollToId,
  scrollToPosition,
} from '../../src/utils/scroll';

describe('generatePageId', () => {
  it('returns correct ID when given a number', () => {
    expect(generatePageIdFromIndex(123)).equals(PAGE_NAV_TARGET_ID_ROOT + '123');
  });

  it('returns correct ID when given a string', () => {
    expect(generatePageIdFromIndex('456')).equals(PAGE_NAV_TARGET_ID_ROOT + '456');
  });
});

describe('scrollTo', () => {
  it('logs a console error when an element with the given ID does not exist', () => {
    const consoleSpy = sinon.spy(console, 'error');
    scrollToId('doesNotExist');

    expect(consoleSpy.calledOnce).to.be.true;
  });

  it('calls scrollIntoView on the element with the given ID if it exists', () => {
    const div = document.createElement('div');
    div.id = 'testId';
    document.body.appendChild(div);

    const stub = sinon.stub();
    window.HTMLElement.prototype.scrollIntoView = stub;
    scrollToId('testId');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith({ behavior: 'smooth', block: 'start', inline: 'center' })).to.be.true;
  });
});

describe('scrollToPosition', () => {
  it('does nothing if it cannot find the target div to scroll', () => {
    const targetDiv = document.createElement('div');
    document.body.appendChild(targetDiv);

    const stub = sinon.stub();
    window.HTMLElement.prototype.scrollTo = stub;

    scrollToPosition(1, 10, 100);
    expect(stub.calledOnce).to.be.false;
  });

  it('does nothing if it cannot find the first page in a PDF document', () => {
    const targetDiv = document.createElement('div');
    targetDiv.classList.add(SCROLLABLE_TARGET_DIV_CLASSNAME);
    document.body.appendChild(targetDiv);

    const stub = sinon.stub();
    window.HTMLElement.prototype.scrollTo = stub;

    scrollToPosition(1, 10, 100);
    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith({ top: 0, left: 0, behavior: 'smooth' })).to.be.true;
  });

  it('should scroll to the specified position when there is at least one page in a PDF document', () => {
    const page1 = document.createElement('div');
    page1.id = generatePageIdFromIndex(0);
    page1.style.height = '700px';
    page1.style.width = '500px';
    page1.style.margin = '20px';

    const page2 = document.createElement('div');
    page2.id = generatePageIdFromIndex(1);
    page2.style.height = '700px';
    page2.style.width = '500px';
    page2.style.margin = '20px';

    const targetDiv = document.createElement('div');
    targetDiv.classList.add(SCROLLABLE_TARGET_DIV_CLASSNAME);
    targetDiv.appendChild(page1);
    targetDiv.appendChild(page2);
    document.body.appendChild(targetDiv);

    const stub = sinon.stub();
    window.HTMLElement.prototype.scrollTo = stub;

    scrollToPosition(1, 10, 100);
    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith({ top: 1371, left: 8, behavior: 'smooth' })).to.be.true;
  });
});
