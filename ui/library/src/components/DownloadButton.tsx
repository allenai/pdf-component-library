import * as React from 'react';

export type Props = {
  pdfUrl: string;
  icon?: React.ReactNode;
  classname?: string;
};

/**
 * HTML anchor tag allows you to download a file from the same origin.
 * This is a workaround to download a file served from a different origin
 */
export const DownloadButton: React.FunctionComponent<Props> = ({
  pdfUrl,
  icon,
  classname,
  ...extraProps
}: Props) => {
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
        a.download = pdfUrl.split('/').pop() || pdfUrl;
        document.body.appendChild(a);
        a.click();
      });
  };

  return (
    <button
      disabled={fetching}
      onClick={() => download()}
      aria-label="Download PDF"
      className={classname ? `reader__download-btn ${classname}` : 'reader__download-btn'}
      {...extraProps}>
      {icon ? icon : 'Download'}
    </button>
  );
};
