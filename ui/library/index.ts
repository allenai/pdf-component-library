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
import { IconFlag } from './src/components/icon/IconFlag';
import { ArrowFlag } from './src/components/marker/ArrowFlag';
import { ArrowFlagBase, POSITION, PositionType } from './src/components/marker/ArrowFlagBase';
import { Outline } from './src/components/outline/Outline';
import { OutlineItem } from './src/components/outline/OutlineItem';
import { Overlay, Props as OverlayProps } from './src/components/Overlay';
import { PageNumberControl } from './src/components/PageNumberControl';
import { PageProps, PageWrapper, Props as PageWrapperProps } from './src/components/PageWrapper';
import { PrintButton, Props as PrintButtonProps } from './src/components/PrintButton';
import { Props as SidePanelProps, SidePanel } from './src/components/SidePanel';
import { Thumbnail } from './src/components/thumbnails/Thumbnail';
import { ThumbnailList } from './src/components/thumbnails/ThumbnailList';
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
import { IPageRenderContext, PageRenderContext } from './src/context/PageRenderContext';
import { IScrollContext, ScrollContext } from './src/context/ScrollContext';
import {
  DEFAULT_ZOOM_SCALE,
  ITransformContext,
  TransformContext,
} from './src/context/TransformContext';
import { IUiContext, UiContext } from './src/context/UiContext';
import { PercentFormatter } from './src/utils/format';
import { RENDER_TYPE } from './src/utils/reader-utils';
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
  IPageRenderContext,
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
  PositionType,
  PrintButtonProps,
  RawBoundingBox,
  SidePanelProps,
  Size,
};

export {
  ArrowFlag,
  ArrowFlagBase,
  BoundingBox,
  computeBoundingBoxStyle,
  computePageStyle,
  ContextProvider,
  DEFAULT_ZOOM_SCALE,
  DocumentContext,
  DocumentWrapper,
  DownloadButton,
  generatePageIdFromIndex,
  getPageHeight,
  getPageWidth,
  HighlightOverlay,
  IconFlag,
  isSideways,
  Outline,
  OutlineItem,
  Overlay,
  PageNumberControl,
  PageRenderContext,
  PageWrapper,
  PercentFormatter,
  POSITION,
  PrintButton,
  RENDER_TYPE,
  rotateClockwise,
  rotateCounterClockwise,
  scaleRawBoundingBox,
  ScrollContext,
  scrollToId,
  scrollToPdfPageIndex,
  SidePanel,
  Thumbnail,
  ThumbnailList,
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
  DEFAULT_ZOOM_SCALE,
  DocumentContext,
  DocumentWrapper,
  DownloadButton,
  ArrowFlag,
  ArrowFlagBase,
  PrintButton,
  generatePageIdFromIndex,
  getPageHeight,
  getPageWidth,
  HighlightOverlay,
  IconFlag,
  isSideways,
  Outline,
  OutlineItem,
  Overlay,
  PageNumberControl,
  PageRenderContext,
  PageRotation,
  PageWrapper,
  POSITION,
  SidePanel,
  PercentFormatter,
  RENDER_TYPE,
  rotateClockwise,
  rotateCounterClockwise,
  scaleRawBoundingBox,
  scrollToId,
  scrollToPdfPageIndex,
  Thumbnail,
  ThumbnailList,
  ScrollContext,
  TransformContext,
  UiContext,
  ZoomInButton,
  ZoomOutButton,
};
