import * as React from 'react';

export type Props = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * HTML anchor tag allows you to download a file from the same origin.
 * This is a workaround to download a file served from a different origin
 */
export const PrintButton: React.FunctionComponent<Props> = ({
  children,
  className,
  ...extraProps
}: Props) => {
  const onClickPrint = () => {
    window.print();
  };

  return (
    <button
      onClick={() => onClickPrint()}
      aria-label="Print PDF"
      className={`reader__print-btn ${className}`}
      {...extraProps}>
      {children ? children : 'Print'}
    </button>
  );
};
