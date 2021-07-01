import { PageSizeContext } from "./PageSizeContext";

import * as React from "react";
import BoundingBox from "./BoundingBox";

type Props = {};

export default function Overlay({}: Props) {
  const { pageSize, scale } = React.useContext(PageSizeContext);
  return (
    <svg
      className="reader__page-overlay"
      width={pageSize.width * scale}
      height={pageSize.height * scale}
    >
      <BoundingBox
        top={10}
        left={10}
        height={10}
        width={10}
        fill="#ff0000"
        stroke="#00ff00"
        onClick={() => window.alert("!!")}
      />
    </svg>
  );
}
