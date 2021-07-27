import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import * as React from 'react';
import { Drawer } from 'antd';
import { Outline as PdfOutline } from 'react-pdf/dist/esm/entry.webpack';

import { scrollToPdfPage } from '../scroll';
import { UIContext } from '../components/UIContext';

export const Outline: React.FunctionComponent = () => {
    const uiContext = React.useContext(UIContext);

    function handleOutlineClick({ pageNumber }: { pageNumber: string }): void {
        scrollToPdfPage(pageNumber);
    };

    function handleCloseDrawer(): void {
        uiContext.setIsDrawerOpen(false);
    };

    return (
        <Drawer
            title="Outline"
            placement="left"
            visible={uiContext.isDrawerOpen}
            mask={false}
            onClose={handleCloseDrawer}
            getContainer={`.${uiContext.drawerContainerClass}`}
            className="reader__outline-drawer">
            <PdfOutline onItemClick={handleOutlineClick} />
        </Drawer>
    );
};
