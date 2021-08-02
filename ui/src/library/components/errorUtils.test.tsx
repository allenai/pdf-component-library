import { expect } from 'chai';

import { getErrorMessage } from './errorUtils';

describe('errorUtils', () => {
  describe('getErrorMessage()', () => {
    const unknownMessage = 'Unknown error';
    const testMessage = 'Test message';

    it('returns unknown error message when error is null', () => {
      const error = null;
      const message = getErrorMessage(error);
      expect(message).equals(unknownMessage);
    });

    it('returns unknown error message when error is undefined', () => {
      const error = undefined;
      const message = getErrorMessage(error);
      expect(message).equals(unknownMessage);
    });

    it("returns an Error's message", () => {
      const error = new Error(testMessage);
      const message = getErrorMessage(error);
      expect(message).equals(testMessage);
    });

    it('returns the given error when error is a string', () => {
      const error = testMessage;
      const message = getErrorMessage(error);
      expect(message).equals(testMessage);
    });

    it('returns error.error when error.error is a string', () => {
      const error = {
        error: testMessage,
        message: "this shouldn't be returned",
      };
      const message = getErrorMessage(error);
      expect(message).equals(testMessage);
    });

    it('returns error.toString() when all else fails', () => {
      const error = {
        message1: 'oops',
        message2: 'stack overflow',
      };
      const message = getErrorMessage(error);
      expect(message).equals(error.toString());
    });
  });
});
