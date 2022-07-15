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
import {
  BoundingBox as BoundingBoxType,
  Dimensions,
  Origin,
  RawBoundingBox,
  scaleRawBoundingBox,
  Size,
} from './src/components/types/boundingBox';
import { NodeDestination, OutlineNode } from './src/components/types/outline';
import { PageProperties, PageReference } from './src/components/types/page';
import { Nullable } from './src/components/types/utils';
import { ZoomInButton } from './src/components/ZoomInButton';
import { ZoomOutButton } from './src/components/ZoomOutButton';
import { ContextProvider, Props as ContextProviderProps } from './src/context/ContextProvider';
import { DocumentContext, IDocumentContext } from './src/context/DocumentContext';
import { IScrollContext, ScrollContext } from './src/context/ScrollContext';
import { ITransformContext, TransformContext } from './src/context/TransformContext';
import { IUiContext, UiContext } from './src/context/UiContext';
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
  Dimensions,
  DocumentWrapperProps,
  DownloadButtonProps,
  HighlightOverlayProps,
  IDocumentContext,
  IScrollContext,
  ITransformContext,
  IUiContext,
  NodeDestination,
  Nullable,
  Origin,
  OutlineNode,
  OverlayProps,
  PageProperties,
  PageProps,
  PageReference,
  PageRotation,
  PageWrapperProps,
  RawBoundingBox,
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
  scaleRawBoundingBox,
  ScrollContext,
  scrollToId,
  scrollToPdfPageIndex,
  TransformContext,
  UiContext,
  ZoomInButton,
  ZoomOutButton,
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
  scaleRawBoundingBox,
  scrollToId,
  scrollToPdfPageIndex,
  ScrollContext,
  TransformContext,
  UiContext,
  ZoomInButton,
  ZoomOutButton,
};
