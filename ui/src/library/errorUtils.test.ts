import { expect } from 'chai';

import { getErrorMessage } from './errorUtils';

describe('getErrorMessage', () => {
    const unknownMsg = 'Unknown error';

    it('returns "Unknown error" if an undefined error is given', () => {
        const error = undefined;
        const result = getErrorMessage(error);

        expect(result).equals(unknownMsg);
    });

    it('returns "Unknown error" if a null error is given', () => {
        const error = null;
        const result = getErrorMessage(error);

        expect(result).equals(unknownMsg);
    });

    it('returns the given error if it is a String', () => {
        const error = 'The coolest error message ever!';
        const result = getErrorMessage(error);

        expect(result).equals(error);
    });

    it('returns error.message if error is an Error', () => {
        const msg = 'We are here again with a fantastic error message from the AI2 team!';
        const result = getErrorMessage(new Error(msg));

        expect(result).equals(msg);
    });

    it('returns error.error if it is a string', () => {
        const error = {
            error: 'Wow, yet another amazing message! These folks are unstoppable.',
        };
        const result = getErrorMessage(error);

        expect(result).equals(error.error);
    });

    it('does not return error.error if it is not a string', () => {
        const error = {
            error: 1234,
        };
        const result = getErrorMessage(error);

        expect(result).not.equals(1234);
    });

    it('returns error.toString() if all else fails', () => {
        const error = 1234;
        const result = getErrorMessage(error);

        expect(result).equals('1234');
    });
});
