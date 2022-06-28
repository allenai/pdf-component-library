/* eslint-disable max-lines-per-function */
import { expect } from 'chai';

import {
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../../src/utils/types';

describe('types', () => {
  describe('isNumber', () => {
    it('should consider 1 to be a number', () => {
      const num = 1;
      expect(isNumber(num)).to.equal(true);
    });

    it('should consider 0 to be a number', () => {
      const num = 0;
      expect(isNumber(num)).to.equal(true);
    });

    it('should consider -1 to be a number', () => {
      const num = -1;
      expect(isNumber(num)).to.equal(true);
    });

    it('should consider NaN to be a number', () => {
      const num = 1 + NaN;
      expect(isNumber(num)).to.equal(true);
    });

    it('should consider string to not be a number', () => {
      const num = 'string';
      expect(isNumber(num)).to.equal(false);
    });

    it('should consider function to not be a number', () => {
      const num = () => void 0;
      expect(isNumber(num)).to.equal(false);
    });

    it('should consider object to not be a number', () => {
      const num = {};
      expect(isNumber(num)).to.equal(false);
    });

    it('should consider true to not be a number', () => {
      const num = true;
      expect(isNumber(num)).to.equal(false);
    });

    it('should consider undefined to not be a number', () => {
      const num = undefined;
      expect(isNumber(num)).to.equal(false);
    });

    it('should consider null to not be a number', () => {
      const num = null;
      expect(isNumber(num)).to.equal(false);
    });
  });

  describe('isString', () => {
    it('should consider string to be a string', () => {
      const str = 'string';
      expect(isString(str)).to.equal(true);
    });

    it('should consider empty string to be a string', () => {
      const str = '';
      expect(isString(str)).to.equal(true);
    });

    it('should consider 0 to not be a string', () => {
      const str = 0;
      expect(isString(str)).to.equal(false);
    });

    it('should consider true to not be a string', () => {
      const str = true;
      expect(isString(str)).to.equal(false);
    });

    it('should consider function to not be a string', () => {
      const str = () => void 0;
      expect(isString(str)).to.equal(false);
    });

    it('should consider object to not be a string', () => {
      const str = {};
      expect(isString(str)).to.equal(false);
    });

    it('should consider undefined to not be a string', () => {
      const str = undefined;
      expect(isString(str)).to.equal(false);
    });

    it('should consider null to not be a string', () => {
      const str = null;
      expect(isString(str)).to.equal(false);
    });
  });

  describe('isBoolean', () => {
    it('should consider true to be a boolean', () => {
      const bool = true;
      expect(isBoolean(bool)).to.equal(true);
    });

    it('should consider false to be a boolean', () => {
      const bool = false;
      expect(isBoolean(bool)).to.equal(true);
    });

    it('should consider 0 to not be a boolean', () => {
      const bool = 0;
      expect(isBoolean(bool)).to.equal(false);
    });

    it('should consider string to not be a boolean', () => {
      const bool = 'string';
      expect(isBoolean(bool)).to.equal(false);
    });

    it('should consider function to not be a boolean', () => {
      const bool = () => void 0;
      expect(isBoolean(bool)).to.equal(false);
    });

    it('should consider object to not be a boolean', () => {
      const bool = {};
      expect(isBoolean(bool)).to.equal(false);
    });

    it('should consider undefined to not be a boolean', () => {
      const bool = undefined;
      expect(isBoolean(bool)).to.equal(false);
    });

    it('should consider null to not be a boolean', () => {
      const bool = null;
      expect(isBoolean(bool)).to.equal(false);
    });
  });

  describe('isFunction', () => {
    it('should consider function to be a function', () => {
      const fn = () => void 0;
      expect(isFunction(fn)).to.equal(true);
    });
    it('should consider hoisted function to be a function', () => {
      const fn = () => void 0;
      expect(isFunction(fn)).to.equal(true);
    });

    it('should consider arrow function to be a function', () => {
      const fn = () => void 0;
      expect(isFunction(fn)).to.equal(true);
    });

    it('should consider constructed function to be a function', () => {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      const fn = new Function();
      expect(isFunction(fn)).to.equal(true);
    });

    it('should consider 0 to not be a function', () => {
      const fn = 0;
      expect(isFunction(fn)).to.equal(false);
    });

    it('should consider string to not be a function', () => {
      const fn = 'string';
      expect(isFunction(fn)).to.equal(false);
    });

    it('should consider false to not be a function', () => {
      const fn = false;
      expect(isFunction(fn)).to.equal(false);
    });

    it('should consider object to not be a function', () => {
      const fn = {};
      expect(isFunction(fn)).to.equal(false);
    });

    it('should consider undefined to not be a function', () => {
      const fn = undefined;
      expect(isFunction(fn)).to.equal(false);
    });

    it('should consider null to not be a function', () => {
      const fn = null;
      expect(isFunction(fn)).to.equal(false);
    });
  });

  describe('isObject', () => {
    it('should consider {} to be an object', () => {
      const obj = {};
      expect(isObject(obj)).to.equal(true);
    });

    it('should consider Object to be an object', () => {
      const obj = new Object();
      expect(isObject(obj)).to.equal(true);
    });

    it('should consider 0 to not be an object', () => {
      const obj = 0;
      expect(isObject(obj)).to.equal(false);
    });

    it('should consider string to not be an object', () => {
      const obj = 'string';
      expect(isObject(obj)).to.equal(false);
    });

    it('should consider false to not be an object', () => {
      const obj = false;
      expect(isObject(obj)).to.equal(false);
    });

    it('should consider function to not be an object', () => {
      const obj = () => void 0;
      expect(isObject(obj)).to.equal(false);
    });

    it('should consider undefined to not be an object', () => {
      const obj = undefined;
      expect(isObject(obj)).to.equal(false);
    });

    it('should consider null to not be an object', () => {
      const obj = null;
      expect(isObject(obj)).to.equal(false);
    });
  });

  describe('isUndefined', () => {
    it('should consider undefined to be undefined', () => {
      const undf = undefined;
      expect(isUndefined(undf)).to.equal(true);
    });
    it('should consider missing prop to be undefined', () => {
      const undf = ({} as any).missingProp;
      expect(isUndefined(undf)).to.equal(true);
    });

    it('should consider void to be undefined', () => {
      const undf = void null;
      expect(isUndefined(undf)).to.equal(true);
    });

    it('should consider 0 to not be undefined', () => {
      const undf = 0;
      expect(isUndefined(undf)).to.equal(false);
    });

    it('should consider string to not be undefined', () => {
      const undf = 'string';
      expect(isUndefined(undf)).to.equal(false);
    });

    it('should consider false to not be undefined', () => {
      const undf = false;
      expect(isUndefined(undf)).to.equal(false);
    });

    it('should consider function to not be undefined', () => {
      const undf = () => void 0;
      expect(isUndefined(undf)).to.equal(false);
    });

    it('should consider object to not be undefined', () => {
      const undf = {};
      expect(isUndefined(undf)).to.equal(false);
    });

    it('should consider null to not be undefined', () => {
      const undf = null;
      expect(isUndefined(undf)).to.equal(false);
    });
  });

  describe('isNull', () => {
    it('should consider null to be null', () => {
      const nil = null;
      expect(isNull(nil)).to.equal(true);
    });

    it('should consider 0 to not be null', () => {
      const nil = 0;
      expect(isNull(nil)).to.equal(false);
    });

    it('should consider string to not be null', () => {
      const nil = 'string';
      expect(isNull(nil)).to.equal(false);
    });

    it('should consider false to not be null', () => {
      const nil = false;
      expect(isNull(nil)).to.equal(false);
    });

    it('should consider function to not be null', () => {
      const nil = () => void 0;
      expect(isNull(nil)).to.equal(false);
    });

    it('should consider object to not be null', () => {
      const nil = {};
      expect(isNull(nil)).to.equal(false);
    });

    it('should consider undefined to not be null', () => {
      const nil = undefined;
      expect(isNull(nil)).to.equal(false);
    });
  });
});
