import * as React from 'react';

import { DemoHeaderContext } from '../context/DemoHeaderContext';
import { deleteBrowserScript, loadBrowserScript } from '../utils/utils';

const HYPOTHESIS_CLIENT_SCRIPT_URL = 'https://hypothes.is/embed.js';

export const NoteTakingDemo: React.FunctionComponent = () => {
  const { isShowingNoteTaking } = React.useContext(DemoHeaderContext);

  React.useEffect(() => {
    async function loadHypothesisClient() {
      await loadBrowserScript(HYPOTHESIS_CLIENT_SCRIPT_URL);
    }

    if (isShowingNoteTaking) {
      loadHypothesisClient();
    } else {
      deleteBrowserScript(HYPOTHESIS_CLIENT_SCRIPT_URL);

      //Hack based off the unload client util used in the Hypothesis browser extension.
      //https://github.com/hypothesis/browser-extension/blob/master/src/unload-client.js
      const annotatorLink = document.querySelector('link[type="application/annotator+html"]');
      if (annotatorLink) {
        // Dispatch a 'destroy' event which is handled by the code in
        // annotator/main.js to remove the client.
        const destroyEvent = new Event('destroy');
        annotatorLink.dispatchEvent(destroyEvent);
      }
    }
  }, [isShowingNoteTaking]);

  return null;
};
