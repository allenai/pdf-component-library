import * as React from 'react';

import { BoundingBox } from './BoundingBox';
import { PageSizeContext } from './PageSizeContext';

type Props = {
    children?: React.ReactElement<typeof BoundingBox>;
    pageNumber: number;
};

export const HighlightOverlay: React.FunctionComponent<Props> = ({ children, pageNumber }: Props) => {
    const { pageSize, scale } = React.useContext(PageSizeContext);
    const style = {
        width: pageSize.width * scale,
        height: pageSize.height * scale,
    };

    const getUnmaskedArea = function (boundingBoxes) {
        const boxes = Array.isArray(boundingBoxes) ? boundingBoxes : [boundingBoxes];
        return boxes.map((box, i) => {
            const boxStyle = {
                width: box.props.width,
                height: box.props.height,
                x: box.props.left,
                y: box.props.top
            };
            return < rect style={boxStyle} key={i} fill="black" ></rect >;
        });
    };

    const maskId = `highlight-overlay-mask-${pageNumber}`;

    return (
        <div className="reader__page-highlight-overlay" style={style}>
            <svg className="page-mask" style={style}>
                <mask id={maskId}>
                    <rect style={style} fill="white"></rect>
                    {getUnmaskedArea(children)}
                </mask>
                <rect style={style} fill="white" opacity="0.6" mask={`url(#${maskId})`}></rect>
            </svg>
        </div>
    );
};
