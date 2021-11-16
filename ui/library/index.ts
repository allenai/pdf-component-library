/*
 * PDF Component Library exports
 */

import { BoundingBox, Props as BoundingBoxProps } from './src/components/BoundingBox';
import { DocumentWrapper, Props as DocumentWrapperProps } from './src/components/DocumentWrapper';
import { DownloadButton, Props as DownloadButtonProps } from './src/components/DownloadButton';
import { HighlightOverlay, Props as HighlightOverlayProps } from './src/components/HighlightOverlay';
import { Overlay, Props as OverlayProps } from './src/components/Overlay';
import { PageWrapper, PageProps, Props as PageWrapperProps } from './src/components/PageWrapper';

import { ContextProvider, Props as ContextProviderProps } from './src/context/ContextProvider';
import { IDocumentContext, DocumentContext } from './src/context/DocumentContext';
import { ITransformContext, TransformContext } from './src/context/TransformContext';
import { IUiContext, UiContext } from './src/context/UiContext';

import { isSideways, PageRotation, rotateClockwise, rotateCounterClockwise } from './src/utils/rotate';
import { generatePageIdfromIndex, scrollToId, scrollToPdfPageIndex } from './src/utils/scroll';
import { computeBoundingBoxStyle, computePageStyle, getPageHeight, getPageWidth } from './src/utils/style';

export default {
    // UI Components
    BoundingBox,
    DocumentWrapper,
    DownloadButton,
    HighlightOverlay,
    Overlay,
    // Context Providers 
    ContextProvider,
    DocumentContext,
    TransformContext,
    UiContext,
    // Utils: rotation
    isSideways,
    PageRotation,
    rotateClockwise,
    rotateCounterClockwise,
    // Utils: scroll
    generatePageIdfromIndex,
    scrollToId,
    scrollToPdfPageIndex,
    // Utils: style 
    computeBoundingBoxStyle,
    computePageStyle,
    getPageHeight,
    getPageWidth,
}
