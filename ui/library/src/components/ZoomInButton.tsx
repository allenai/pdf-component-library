import * as React from 'react';

import { TransformContext } from '../context/TransformContext';

export type Props = {
    children?: React.ReactNode;
};

export const ZoomInButton: React.FunctionComponent<Props> = ({ children }: Props) => {
    const { scale, setScale, zoomMultiplier } = React.useContext(TransformContext);

    const handleZoomIn = React.useCallback(() => {
        setScale(scale * zoomMultiplier);
    }, [scale, zoomMultiplier]);

    return (
        <a className="reader__zoom-btn zoom-in" onClick={handleZoomIn}>
            {children ? children : '+'}
        </a>
    );
};
