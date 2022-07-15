// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../react
//   ../react-pdf
//   ../react-pdf/dist/Page

declare module '@allenai/pdf-components' {
    import './less/index.less';
    import { BoundingBox, Props as BoundingBoxProps } from '@allenai/pdf-components/src/components/BoundingBox';
    import { DocumentWrapper, Props as DocumentWrapperProps } from '@allenai/pdf-components/src/components/DocumentWrapper';
    import { DownloadButton, Props as DownloadButtonProps } from '@allenai/pdf-components/src/components/DownloadButton';
    import { HighlightOverlay, Props as HighlightOverlayProps } from '@allenai/pdf-components/src/components/HighlightOverlay';
    import { Outline } from '@allenai/pdf-components/src/components/outline/Outline';
    import { OutlineItem } from '@allenai/pdf-components/src/components/outline/OutlineItem';
    import { Overlay, Props as OverlayProps } from '@allenai/pdf-components/src/components/Overlay';
    import { PageProps, PageWrapper, Props as PageWrapperProps } from '@allenai/pdf-components/src/components/PageWrapper';
    import { BoundingBox as BoundingBoxType, Dimensions, Origin, RawBoundingBox, scaleRawBoundingBox, Size } from '@allenai/pdf-components/src/components/types/boundingBox';
    import { NodeDestination, OutlineNode } from '@allenai/pdf-components/src/components/types/outline';
    import { PageProperties, PageReference } from '@allenai/pdf-components/src/components/types/page';
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    import { ZoomInButton } from '@allenai/pdf-components/src/components/ZoomInButton';
    import { ZoomOutButton } from '@allenai/pdf-components/src/components/ZoomOutButton';
    import { ContextProvider, Props as ContextProviderProps } from '@allenai/pdf-components/src/context/ContextProvider';
    import { DocumentContext, IDocumentContext } from '@allenai/pdf-components/src/context/DocumentContext';
    import { IScrollContext, ScrollContext } from '@allenai/pdf-components/src/context/ScrollContext';
    import { ITransformContext, TransformContext } from '@allenai/pdf-components/src/context/TransformContext';
    import { IUiContext, UiContext } from '@allenai/pdf-components/src/context/UiContext';
    import { isSideways, PageRotation, rotateClockwise, rotateCounterClockwise } from '@allenai/pdf-components/src/utils/rotate';
    import { generatePageIdFromIndex, scrollToId, scrollToPdfPageIndex } from '@allenai/pdf-components/src/utils/scroll';
    import { computeBoundingBoxStyle, computePageStyle, getPageHeight, getPageWidth } from '@allenai/pdf-components/src/utils/style';
    export type { BoundingBoxProps, BoundingBoxType, ContextProviderProps, Dimensions, DocumentWrapperProps, DownloadButtonProps, HighlightOverlayProps, IDocumentContext, IScrollContext, ITransformContext, IUiContext, NodeDestination, Nullable, Origin, OutlineNode, OverlayProps, PageProperties, PageProps, PageReference, PageRotation, PageWrapperProps, RawBoundingBox, Size, };
    export { BoundingBox, computeBoundingBoxStyle, computePageStyle, ContextProvider, DocumentContext, DocumentWrapper, DownloadButton, generatePageIdFromIndex, getPageHeight, getPageWidth, HighlightOverlay, isSideways, Outline, OutlineItem, Overlay, PageWrapper, rotateClockwise, rotateCounterClockwise, scaleRawBoundingBox, ScrollContext, scrollToId, scrollToPdfPageIndex, TransformContext, UiContext, ZoomInButton, ZoomOutButton, };
    const _default: {
        BoundingBox: import("react").FunctionComponent<BoundingBoxProps>;
        computeBoundingBoxStyle: typeof computeBoundingBoxStyle;
        computePageStyle: typeof computePageStyle;
        ContextProvider: import("react").FunctionComponent<ContextProviderProps>;
        DocumentContext: import("react").Context<IDocumentContext>;
        DocumentWrapper: import("react").FunctionComponent<DocumentWrapperProps>;
        DownloadButton: import("react").FunctionComponent<DownloadButtonProps>;
        generatePageIdFromIndex: typeof generatePageIdFromIndex;
        getPageHeight: typeof getPageHeight;
        getPageWidth: typeof getPageWidth;
        HighlightOverlay: import("react").FunctionComponent<HighlightOverlayProps>;
        isSideways: typeof isSideways;
        Outline: import("react").FunctionComponent<{}>;
        OutlineItem: import("react").FunctionComponent<{
            items?: OutlineNode[] | undefined;
            onClick?: ((dest: NodeDestination) => void) | undefined;
        }>;
        Overlay: import("react").FunctionComponent<OverlayProps>;
        PageRotation: typeof PageRotation;
        PageWrapper: import("react").FunctionComponent<PageWrapperProps>;
        rotateClockwise: typeof rotateClockwise;
        rotateCounterClockwise: typeof rotateCounterClockwise;
        scaleRawBoundingBox: typeof scaleRawBoundingBox;
        scrollToId: typeof scrollToId;
        scrollToPdfPageIndex: typeof scrollToPdfPageIndex;
        ScrollContext: import("react").Context<IScrollContext>;
        TransformContext: import("react").Context<ITransformContext>;
        UiContext: import("react").Context<IUiContext>;
        ZoomInButton: import("react").FunctionComponent<import("./src/components/ZoomInButton").Props>;
        ZoomOutButton: import("react").FunctionComponent<{}>;
    };
    export default _default;
}

declare module '@allenai/pdf-components/src/components/BoundingBox' {
    import * as React from 'react';
    import { BoundingBox as BoundingBoxType } from '@allenai/pdf-components/src/components/types/boundingBox';
    export type Props = {
        className?: string;
        id?: string;
        isHighlighted?: boolean;
        onClick?: () => void;
    } & BoundingBoxType;
    export const BoundingBox: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/DocumentWrapper' {
    import * as React from 'react';
    import { DocumentProps } from 'react-pdf';
    export type Props = {
        children?: React.ReactNode;
    } & DocumentProps;
    export const DocumentWrapper: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/DownloadButton' {
    import * as React from 'react';
    export type Props = {
        className?: string;
        children?: React.ReactNode;
        pdfUrl: string;
    };
    /**
      * HTML anchor tag allows you to download a file from the same origin.
      * This is a workaround to download a file served from a different origin
      */
    export const DownloadButton: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/HighlightOverlay' {
    import * as React from 'react';
    import { Props as BoundingBoxProps } from '@allenai/pdf-components/src/components/BoundingBox';
    export type Props = {
        children?: React.ReactElement<BoundingBoxProps> | Array<React.ReactElement<BoundingBoxProps>>;
        pageIndex: number;
    };
    export const HighlightOverlay: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/outline/Outline' {
    import * as React from 'react';
    export const Outline: React.FunctionComponent;
}

declare module '@allenai/pdf-components/src/components/outline/OutlineItem' {
    import * as React from 'react';
    import { NodeDestination, OutlineNode } from '@allenai/pdf-components/src/components/types/outline';
    type Props = {
        items?: Array<OutlineNode>;
        onClick?: (dest: NodeDestination) => void;
    };
    export const OutlineItem: React.FunctionComponent<Props>;
    export {};
}

declare module '@allenai/pdf-components/src/components/Overlay' {
    import * as React from 'react';
    import { BoundingBox } from '@allenai/pdf-components/src/components/BoundingBox';
    export type Props = {
        children?: React.ReactElement<typeof BoundingBox> | Array<React.ReactElement<typeof BoundingBox>>;
    };
    export const Overlay: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/PageWrapper' {
    import * as React from 'react';
    import { RenderFunction } from 'react-pdf/dist/Page';
    import { HighlightOverlay } from '@allenai/pdf-components/src/components/HighlightOverlay';
    import { Overlay } from '@allenai/pdf-components/src/components/Overlay';
    /**
      * A subset of react-pdf's Page component props exposed by this wrapper
      */
    export type PageProps = {
        error?: string | React.ReactElement | RenderFunction;
        loading?: string | React.ReactElement | RenderFunction;
        noData?: string | React.ReactElement | RenderFunction;
        pageIndex: number;
    };
    export type Props = {
        className?: string;
        children?: React.ReactElement<typeof HighlightOverlay | typeof Overlay>;
    } & PageProps;
    export const PageWrapper: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/types/boundingBox' {
    export type Dimensions = {
        height: number;
        width: number;
    };
    export type Origin = {
        top: number;
        left: number;
    };
    export type Size = Dimensions & Origin;
    export type BoundingBox = {
        page: number;
    } & Size;
    export type RawBoundingBox = BoundingBox;
    export function scaleRawBoundingBox(boundingBoxRaw: RawBoundingBox, pageHeight: number, pageWidth: number): BoundingBox;
}

declare module '@allenai/pdf-components/src/components/types/outline' {
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    export type NodeDestination = Nullable<string> | any[];
    export type OutlineNode = {
        title: string;
        bold: boolean;
        italic: boolean;
        color: Uint8ClampedArray;
        dest: NodeDestination;
        url: Nullable<string>;
        unsafeUrl: string | undefined;
        newWindow: boolean | undefined;
        count: number | undefined;
        items: any[];
    };
}

declare module '@allenai/pdf-components/src/components/types/page' {
    export type PageReference = {
        num: number;
        gen: number;
    };
    export type PageProperties = {
        width: number;
        height: number;
        marginTop: number;
        marginBottom: number;
        marginLeft: number;
        marginRight: number;
    };
}

declare module '@allenai/pdf-components/src/components/types/utils' {
    export type Nullable<T> = T | null;
}

declare module '@allenai/pdf-components/src/components/ZoomInButton' {
    import * as React from 'react';
    export type Props = {
        children?: React.ReactNode;
    };
    export const ZoomInButton: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/components/ZoomOutButton' {
    import * as React from 'react';
    export type Props = {
        children?: React.ReactNode;
    };
    export const ZoomOutButton: React.FunctionComponent;
}

declare module '@allenai/pdf-components/src/context/ContextProvider' {
    import * as React from 'react';
    export type Props = {
        children?: React.ReactElement | Array<React.ReactElement>;
    };
    export const ContextProvider: React.FunctionComponent<Props>;
}

declare module '@allenai/pdf-components/src/context/DocumentContext' {
    import * as React from 'react';
    import { pdfjs } from 'react-pdf';
    import { Dimensions } from '@allenai/pdf-components/src/components/types/boundingBox';
    import { OutlineNode } from '@allenai/pdf-components/src/components/types/outline';
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    export interface IDocumentContext {
        numPages: number;
        outline: Nullable<Array<OutlineNode>>;
        pageDimensions: Dimensions;
        pdfDocProxy?: pdfjs.PDFDocumentProxy;
        setNumPages: (numPages: number) => void;
        setOutline: (outline: Nullable<Array<OutlineNode>>) => void;
        setPageDimensions: (pageDimensions: Dimensions) => void;
        setPdfDocProxy: (pdfDocProxy: pdfjs.PDFDocumentProxy) => void;
    }
    export const DocumentContext: React.Context<IDocumentContext>;
    export function useDocumentContextProps(): IDocumentContext;
}

declare module '@allenai/pdf-components/src/context/ScrollContext' {
    import * as React from 'react';
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    import { ScrollDirection } from '@allenai/pdf-components/src/utils/ScrollDirectionDetector';
    export interface IScrollContext {
        scrollDirection: Nullable<ScrollDirection>;
        setScrollRoot: (root: Nullable<Element>) => any;
    }
    export const ScrollContext: React.Context<IScrollContext>;
    export function useScrollContextProps(): IScrollContext;
}

declare module '@allenai/pdf-components/src/context/TransformContext' {
    import * as React from 'react';
    import { PageRotation } from '@allenai/pdf-components/src/utils/rotate';
    export interface ITransformContext {
        rotation: PageRotation;
        scale: number;
        zoomMultiplier: number;
        setRotation: (rotation: PageRotation) => void;
        setScale: (scale: number) => void;
        setZoomMultiplier: (zoom: number) => void;
    }
    export const TransformContext: React.Context<ITransformContext>;
    export function useTransformContextProps(): ITransformContext;
}

declare module '@allenai/pdf-components/src/context/UiContext' {
    import * as React from 'react';
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    export interface IUiContext {
        errorMessage: Nullable<string>;
        isLoading: boolean;
        isShowingHighlightOverlay: boolean;
        isShowingOutline: boolean;
        isShowingTextHighlight: boolean;
        setErrorMessage: (errorMessage: Nullable<string>) => void;
        setIsLoading: (isLoading: boolean) => void;
        setIsShowingHighlightOverlay: (isShowingHighlightOverlay: boolean) => void;
        setIsShowingOutline: (isShowingOutline: boolean) => void;
        setIsShowingTextHighlight: (isShowingTextHighlight: boolean) => void;
    }
    export const UiContext: React.Context<IUiContext>;
    export function useUiContextProps(): IUiContext;
}

declare module '@allenai/pdf-components/src/utils/rotate' {
    export enum PageRotation {
        Rotate0 = 0,
        Rotate90 = 90,
        Rotate180 = 180,
        Rotate270 = 270
    }
    export function rotateClockwise(rotation: PageRotation): PageRotation;
    export function rotateCounterClockwise(rotation: PageRotation): PageRotation;
    /**
      * Tests whether the page is rotated 90 degrees clockwise or counterclockwise from zero,
      * e.g. whether the page "is rotated sideways."
      */
    export function isSideways(rotation: PageRotation): boolean;
}

declare module '@allenai/pdf-components/src/utils/scroll' {
    import { PageProperties } from '@allenai/pdf-components/src/components/types/page';
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    import { PageRotation } from '@allenai/pdf-components/src/utils/rotate';
    export const PAGE_NAV_TARGET_ID_ROOT = "reader_pg_";
    export function generatePageIdFromIndex(pageIndex: number | string): string;
    export function scrollToId(id: string): void;
    export function scrollToPdfPageIndex(pageIndex: number | string): void;
    /**
        * Scroll PDF document to a specific position.
        * @param pageIndex The index of the page where the position locates at
        * @param leftPoints The horizontal distance between the origin and the position (in PDF coordinates)
        * @param bottomPoints The vertical distance between the origin and the position (in PDF coordinates)
        * @param rotation The rotation degree of the document
        */
    export function scrollToPosition(pageIndex: number, leftPoints: number, bottomPoints: number, rotation?: PageRotation): void;
    export function getScrollParent(node: HTMLElement): Nullable<HTMLElement>;
    export function calculateTopPx({ heightWithMarginsInPx, pageIndex, marginTopPx, heightPx, bottomPx, }: {
            heightWithMarginsInPx: number;
            pageIndex: number;
            marginTopPx: number;
            heightPx: number;
            bottomPx: number;
    }): number;
    /**
        * Get lengths, widths, and margins of a page.
        * @returns a PageProperties object
        */
    export function getPagePropertiesInPixels(): PageProperties;
}

declare module '@allenai/pdf-components/src/utils/style' {
    import { Dimensions, Size } from '@allenai/pdf-components/src/components/types/boundingBox';
    import { PageRotation } from '@allenai/pdf-components/src/utils/rotate';
    export function computeBoundingBoxStyle(boundingBoxSize: Size, pageDimensions: Dimensions, rotation: PageRotation, scale: number): Size;
    export function computePageStyle(pageDimensions: Dimensions, rotation: PageRotation, scale: number): Size;
    export function getPageHeight(pageDimensions: Dimensions, rotation: PageRotation): number;
    export function getPageWidth(pageDimensions: Dimensions, rotation: PageRotation): number;
}

declare module '@allenai/pdf-components/src/utils/ScrollDirectionDetector' {
    import { Nullable } from '@allenai/pdf-components/src/components/types/utils';
    export enum ScrollDirection {
        UP = "UP",
        DOWN = "DOWN"
    }
    export default class ScrollDetector {
        _lastScrollTop: number;
        _lastScrollDirection: Nullable<ScrollDirection>;
        _el: Element;
        _setScrollDirection: (scrollDirection: ScrollDirection) => any;
        constructor(el: Element, setScrollDirection: (scrollDirection: ScrollDirection) => any);
        attachScrollListener(): void;
        detachScrollListener(): void;
        _onScroll: () => void;
    }
}

