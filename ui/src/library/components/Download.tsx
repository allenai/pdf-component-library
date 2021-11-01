import * as React from 'react';

type Props = {
  fileName: string;
  pdfUrl: string;
};

/**
 * HTML anchor tag allows you to download a file from the same origin.
 * This is a workaround to download a file served from a different origin
 */
export const Download: React.FunctionComponent<Props> = ({ fileName, pdfUrl }: Props) => {
  const [fetching, setFetching] = React.useState(false);

  const download = () => {
    setFetching(true);

    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
      });
  };

  return (
    <button disabled={fetching} onClick={() => download()} aria-label="download PDF">
      Download
    </button>
  );
};
