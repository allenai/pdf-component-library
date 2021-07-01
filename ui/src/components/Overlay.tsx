import { PageSizeContext } from "./PageSizeContext";

import * as React from "react";

type Props = {
  /**
   * Really this should only be a BoundingBox
   * TODO: Can it be better scoped?
   */
  children: React.ReactNode
};

const Overlay: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { pageSize, scale } = React.useContext(PageSizeContext);
  return (
    <svg
      className="reader__page-overlay"
      width={pageSize.width * scale}
      height={pageSize.height * scale}
    >
      {children}
    </svg>
  );
}

export default Overlay;
