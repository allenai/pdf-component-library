import { expect } from 'chai';
import * as sinon from 'sinon';

import { PageRotation } from '../../src/utils/rotate';
import {
  calculateTopPx,
  generatePageIdFromIndex,
  getPagePropertiesInPixels,
  getScrollParent,
  PAGE_NAV_TARGET_ID_ROOT,
  scrollToId,
  scrollToPosition,
} from '../../src/utils/scroll';

describe('scroll', () => {
  describe('generatePageId()', () => {
    it('returns correct ID when given a number', () => {
      expect(generatePageIdFromIndex(123)).equals(PAGE_NAV_TARGET_ID_ROOT + '123');
    });

    it('returns correct ID when given a string', () => {
      expect(generatePageIdFromIndex('456')).equals(PAGE_NAV_TARGET_ID_ROOT + '456');
    });
  });

  describe('scrollTo()', () => {
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

  describe('getPagePropertiesInPixels()', () => {
    it('sets all properties 0 if it cannot find the first page of a PDF document', () => {
      const targetDiv = document.createElement('div');
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;

      const pageProperties = getPagePropertiesInPixels();
      for (const value of Object.values(pageProperties)) expect(value).to.equal(0);

      targetDiv.remove();
    });

    it('sets all properties with corresponding values extracted from the first page of a PDF document', () => {
      const page1 = document.createElement('div');
      page1.id = generatePageIdFromIndex(0);
      page1.style.height = '700px';
      page1.style.width = '500px';
      page1.style.margin = '20px';

      const targetDiv = document.createElement('div');
      targetDiv.appendChild(page1);
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;

      const pageProperties = getPagePropertiesInPixels();
      expect(pageProperties.height).equal(parseInt(page1.style.height));
      expect(pageProperties.width).equal(parseInt(page1.style.width));
      expect(pageProperties.marginTop).equal(parseInt(page1.style.margin));
      expect(pageProperties.marginBottom).equal(parseInt(page1.style.margin));
      expect(pageProperties.marginLeft).equal(parseInt(page1.style.margin));
      expect(pageProperties.marginRight).equal(parseInt(page1.style.margin));

      page1.remove();
      targetDiv.remove();
    });
  });

  describe('scrollToPosition()', () => {
    it('does nothing if it cannot find the target div to scroll', () => {
      const targetDiv = document.createElement('div');
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;

      scrollToPosition(1, 10, 100);
      expect(stub.calledOnce).to.be.false;

      targetDiv.remove();
    });

    it('does nothing if it cannot find the first page in a PDF document', () => {
      const targetDiv = document.createElement('div');
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;

      scrollToPosition(1, 10, 100);
      expect(stub.calledOnce).to.be.false;

      targetDiv.remove();
    });

    it('should scroll to the specified position correctly when there is at least one page in a PDF document', () => {
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
      targetDiv.appendChild(page1);
      targetDiv.appendChild(page2);
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;
      scrollToPosition(1, 10, 100);
      expect(stub.calledOnce).to.be.true;
      expect(stub.calledWith({ top: 1371, left: 8, behavior: 'smooth' })).to.be.true;

      page1.remove();
      page2.remove();
      targetDiv.remove();
    });

    it('should scroll to the specified position correcly when pages are rotated', () => {
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
      targetDiv.appendChild(page1);
      targetDiv.appendChild(page2);
      document.body.appendChild(targetDiv);

      const stub = sinon.stub();
      window.HTMLElement.prototype.scrollTo = stub;

      scrollToPosition(1, 10, 100, PageRotation.Rotate0);
      expect(stub.calledWith({ top: 1371, left: 8, behavior: 'smooth' })).to.be.true;
      scrollToPosition(1, 10, 100, PageRotation.Rotate90);
      expect(stub.calledWith({ top: 771, left: 63, behavior: 'smooth' })).to.be.true;
      scrollToPosition(1, 10, 100, PageRotation.Rotate180);
      expect(stub.calledWith({ top: 848, left: 491, behavior: 'smooth' })).to.be.true;
      scrollToPosition(1, 10, 100, PageRotation.Rotate270);
      expect(stub.calledWith({ top: 1448, left: 436, behavior: 'smooth' })).to.be.true;

      page1.remove();
      page2.remove();
      targetDiv.remove();
    });
  });

  describe('calculateTopPx()', () => {
    it('should calculate top pixel', () => {
      expect(
        calculateTopPx({
          heightWithMarginsInPx: 1104,
          pageIndex: 0,
          marginTopPx: 24,
          heightPx: 1056,
          bottomPx: 282.156,
        })
      ).to.equal(797);
    });
  });

  describe('getScrollParent()', () => {
    it('should return a scrollable element', () => {
      const page1 = document.createElement('div');
      page1.id = generatePageIdFromIndex(0);
      page1.style.height = '700px';
      page1.style.width = '500px';
      page1.style.margin = '20px';
      expect(getScrollParent(page1).nodeName).to.equal(document.documentElement.nodeName);
    });
  });
});
