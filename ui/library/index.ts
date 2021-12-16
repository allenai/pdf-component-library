/*
 * PDF Component Library exports
 */

import './less/index.less';

import { BoundingBox, Props as BoundingBoxProps } from './src/components/BoundingBox';
import { DocumentWrapper, Props as DocumentWrapperProps } from './src/components/DocumentWrapper';
import { DownloadButton, Props as DownloadButtonProps } from './src/components/DownloadButton';
import {
  HighlightOverlay,
  Props as HighlightOverlayProps,
} from './src/components/HighlightOverlay';
import { Outline } from './src/components/outline/Outline';
import { OutlineItem } from './src/components/outline/OutlineItem';
import { Overlay, Props as OverlayProps } from './src/components/Overlay';
import { PageProps, PageWrapper, Props as PageWrapperProps } from './src/components/PageWrapper';
import { ContextProvider, Props as ContextProviderProps } from './src/context/ContextProvider';
import { DocumentContext, IDocumentContext } from './src/context/DocumentContext';
import { ITransformContext, TransformContext } from './src/context/TransformContext';
import { IUiContext, UiContext } from './src/context/UiContext';
import { BoundingBox as BoundingBoxType, Dimensions, Nullable, Origin, Size, OutlineNode, Destination } from './src/types';
import {
  isSideways,
  PageRotation,
  rotateClockwise,
  rotateCounterClockwise,
} from './src/utils/rotate';
import { generatePageIdFromIndex, scrollToId, scrollToPdfPageIndex } from './src/utils/scroll';
import {
  computeBoundingBoxStyle,
  computePageStyle,
  getPageHeight,
  getPageWidth,
} from './src/utils/style';

export type {
  BoundingBoxProps,
  BoundingBoxType,
  ContextProviderProps,
  Destination,
  Dimensions,
  DocumentWrapperProps,
  DownloadButtonProps,
  HighlightOverlayProps,
  IDocumentContext,
  ITransformContext,
  IUiContext,
  Nullable,
  Origin,
  OverlayProps,
  OutlineNode,
  PageProps,
  PageRotation,
  PageWrapperProps,
  Size,
};

export {
  BoundingBox,
  computeBoundingBoxStyle,
  computePageStyle,
  ContextProvider,
  DocumentContext,
  DocumentWrapper,
  DownloadButton,
  generatePageIdFromIndex,
  getPageHeight,
  getPageWidth,
  HighlightOverlay,
  isSideways,
  Outline,
  OutlineItem,
  Overlay,
  PageWrapper,
  rotateClockwise,
  rotateCounterClockwise,
  scrollToId,
  scrollToPdfPageIndex,
  TransformContext,
  UiContext,
};

export default {
  BoundingBox,
  computeBoundingBoxStyle,
  computePageStyle,
  ContextProvider,
  DocumentContext,
  DocumentWrapper,
  DownloadButton,
  generatePageIdFromIndex,
  getPageHeight,
  getPageWidth,
  HighlightOverlay,
  isSideways,
  Outline,
  OutlineItem,
  Overlay,
  PageRotation,
  PageWrapper,
  rotateClockwise,
  rotateCounterClockwise,
  scrollToId,
  scrollToPdfPageIndex,
  TransformContext,
  UiContext,
};
