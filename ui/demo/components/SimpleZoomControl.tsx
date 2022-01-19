import { TransformContext, ZoomInButton, ZoomOutButton } from 'pdf-components-dist';
import * as React from 'react';

import { PercentFormatter } from '../utils/format';

export const SimpleZoomControl: React.FunctionComponent = () => {
  const { scale } = React.useContext(TransformContext);

  const renderLabel = React.useCallback(() => {
    return <span>{PercentFormatter.format(scale)}</span>;
  }, [scale]);

  return (
    <span>
      <ZoomOutButton />
      {renderLabel()}
      <ZoomInButton />
    </span>
  );
};
