import { PageSizeContext } from "./PageSizeContext";
import BoundingBox from "./BoundingBox";

import * as React from "react";

type Props = {
  children: React.ReactElement<typeof BoundingBox>
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
