import * as React from 'react';

import { BoundingBox } from '../library/components/BoundingBox';
import { HighlightOverlay } from '../library/components/HighlightOverlay';
import { UiContext } from '../library/context/UiContext';
import { BoundingBox as BoundingBoxType } from '../library/types';

type Props = {
    // TODO: #28926 subtask choose between pageNumber/pageIndex
    pageIndex: number;
};

/*
 * Example of the HighlightOverlay component
 */
export const HighlightOverlayDemo: React.FunctionComponent<Props> = ({ pageIndex }: Props) => {
    const { isShowingHighlightOverlay } = React.useContext(UiContext);
    // TODO: #28926 subtask choose between pageNumber/pageIndex
    const pageNumber = pageIndex + 1;

    function getBoundingBoxProps(): Array<BoundingBoxType> {
        return [
            {
                page: 0,
                top: 280,
                left: 250,
                height: 20,
                width: 420,
            },
            {
                page: 0,
                top: 300,
                left: 130,
                height: 55,
                width: 540,
            },
            {
                page: 0,
                top: 355,
                left: 130,
                height: 20,
                width: 225,
            },
        ];
    }

    function renderHighlightOverlayBoundingBoxes(): Array<React.ReactElement> {
        let boxes = new Array();
        getBoundingBoxProps().map((prop, i) => {
            // Only render this BoundingBox if it belongs on the current page
            if (prop.page === pageIndex) {
                const props = {
                    ...prop,
                    className: 'reader__sample-highlight-overlay__bbox',
                    isHighlighted: false,
                    key: i,
                };

                boxes.push(<BoundingBox {...props} />);
            }
        });
        return boxes;
    }

    return (
        (isShowingHighlightOverlay &&
            <HighlightOverlay pageNumber={pageNumber}>
                {renderHighlightOverlayBoundingBoxes()}
            </HighlightOverlay>)
        || (null)
    );
};
