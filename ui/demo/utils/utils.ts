/**
 * Use this file as a spot for small utility methods used throughout your
 * application.
 */

// Collection of scripts currently being loaded onto the browser
const loadingScripts: Map<string, Promise<string>> = new Map([]);

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

export function loadBrowserScript(url: string): Promise<string> {
  if (loadingScripts.has(url)) {
    return Promise.resolve(url);
  } else if (document.querySelectorAll(`script[src="${url}"]`).length !== 0) {
    return Promise.resolve(url);
  } else {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      const head = document.head;
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      const scriptEl = head.appendChild(script);
      const onLoadedOrError = (event: Event): void => {
        loadingScripts.delete(url);
        scriptEl.removeEventListener('load', onLoadedOrError);
        scriptEl.removeEventListener('error', onLoadedOrError);
        if (event.type === 'load') {
          resolve(url);
        } else {
          reject(url);
        }
      };
      scriptEl.addEventListener('load', onLoadedOrError);
      scriptEl.addEventListener('error', onLoadedOrError);
    });
    loadingScripts.set(url, promise);
    return promise;
  }
}

export function deleteBrowserScript(url: string): void {
  const scripts = document.querySelectorAll(`script[src="${url}"]`);
  scripts.forEach(script => {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
  });
}
