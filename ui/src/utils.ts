/**
 * Use this file as a spot for small utility methods used throughout your
 * application.
 */

/**
 * Query string values can be strings or an array of strings. This utility
 * retrieves the value if it's a string, or takes the first string if it's an
 * array of strings.
 *
 * If no value is provided, the provided default value is returned.
 *
 * @param {string} value
 * @param {string} defaultValue
 *
 * @returns {string}
 */
export function unwrap(value: string | string[] | undefined | null, defaultValue = ''): string {
  if (value === undefined || value === null) {
    return defaultValue;
  } else if (Array.isArray(value)) {
    return value[0];
  } else {
    return value;
  }
}

export function loadJSON(path: string, callback: (responseText: string) => void): void {
  const request = new XMLHttpRequest();
  request.overrideMimeType('application/json');
  request.open('GET', path, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
  request.send(null);
}
