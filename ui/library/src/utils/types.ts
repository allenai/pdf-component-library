/**
 * This file is for type utilities that make using Typescript easier
 */

export type Nullable<T> = T | null;

export function isNumber(any: any): any is number {
  return typeof any === 'number';
}

export function isString(any: any): any is string {
  return typeof any === 'string';
}

export function isBoolean(any: any): any is boolean {
  return typeof any === 'boolean';
}

export function isFunction<T = (...args: any[]) => any>(any: any): any is T {
  return typeof any === 'function';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject<T = object>(any: any): any is T {
  return any !== null && typeof any === 'object';
}

export function isUndefined(any: any): any is undefined {
  return typeof any === 'undefined';
}

export function isNull(any: any): any is null {
  return null === any;
}
