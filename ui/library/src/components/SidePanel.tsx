import classnames from "classnames";
import * as React from "react";

import { bandPassFilter } from "../utils/util";

const DEFAULT_MIN_WIDTH_PX = 300;
const DEFAULT_MAX_WIDTH_PX = 700;

export type Props = {
  minWidthPx?: number;
  maxWidthPx?: number;
  className?: string;
  children?: React.ReactNode;
  header?: string | React.ReactElement;
  content?: string | React.ReactElement;
  footer?: string | React.ReactElement;
  isVisible?: boolean;
  dragHandlePosition?: string;
  closeButton?: boolean | React.ReactElement;
  onClose?: () => void;
};

export const SidePanel: React.FunctionComponent<Props> = ({
  minWidthPx = DEFAULT_MIN_WIDTH_PX,
  maxWidthPx = DEFAULT_MAX_WIDTH_PX,
  className,
  children,
  header,
  content,
  footer,
  dragHandlePosition,
  closeButton,
  isVisible = true,
  onClose,
  ...extraProps
}: Props) => {
  // The overlay is used to catch mouse up events over iframe contents
  // so the mouseup events will not be missed if the click is released over
  // the iframe and the event listeners will fail to be removed
  const [isOverlayVisible, setIsOverlayVisible] =
    React.useState<boolean>(false);
  const [panelWidth, setPanelWidth] = React.useState<number>(minWidthPx);
  const sidePanelRef = React.useRef<HTMLDivElement>(null);
  const dragHandleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // clean up event listeners from resizing panel in case they didn't get removed
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
  });

  const renderCloseButton = () => {
    if (typeof closeButton === "boolean") {
      return (
        <button
          className="pdf-reader__side-panel-close-button"
          onClick={onClose}
        >
          x
        </button>
      );
    }
    return closeButton;
  };

  const onMouseMove = (mouseMoveEvent: MouseEvent): void => {
    if (!sidePanelRef || !sidePanelRef.current) {
      return;
    }

    const newWidth =
      dragHandlePosition === "left"
        ? sidePanelRef.current.getBoundingClientRect().right -
          mouseMoveEvent.pageX
        : mouseMoveEvent.pageX -
          sidePanelRef.current.getBoundingClientRect().left;

    setPanelWidth(bandPassFilter(newWidth, minWidthPx, maxWidthPx));
  };

  const onMouseUp = (): void => {
    // drop opacity styling on drag handle
    if (dragHandleRef && dragHandleRef.current) {
      dragHandleRef.current.removeAttribute("style");
    }
    setIsOverlayVisible(false);
    document.body.removeEventListener("mousemove", onMouseMove);
  };

  const renderDragHandle = () => {
    const isDragHandleOnLeft = dragHandlePosition === "left";
    const isDragHandleOnRight = dragHandlePosition === "right";
    if (!isDragHandleOnLeft && !isDragHandleOnRight) {
      return null;
    }

    const onDraggingHandle = (): void => {
      // prevent flashing when the mouse hovers outside the resize zone
      if (dragHandleRef && dragHandleRef.current) {
        dragHandleRef.current.style.opacity = "1";
      }

      setIsOverlayVisible(true);
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    const onChangePanelWidth = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const newWidth = parseInt(event.currentTarget.value);
      setPanelWidth(bandPassFilter(newWidth, minWidthPx, maxWidthPx));
    };

    return (
      <div
        className={classnames("pdf-reader__resize-zone", {
          "pdf-reader__resize-zone--left": isDragHandleOnLeft,
          "pdf-reader__resize-zone--right": isDragHandleOnRight,
        })}
      >
        <input
          className="pdf-reader__drag-handle__assistive-input"
          type="range"
          min={minWidthPx}
          max={maxWidthPx}
          step="5"
          value={panelWidth}
          onChange={onChangePanelWidth}
        />
        <div
          ref={dragHandleRef}
          role="slider"
          aria-valuenow={panelWidth}
          tabIndex={-1}
          onMouseDown={onDraggingHandle}
          className="pdf-reader__drag-handle"
        >
          <div className="pdf-reader__drag-handle__inner" />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={sidePanelRef}
      style={{ width: panelWidth }}
      className={classnames(
        "pdf-reader__side-panel",
        { "pdf-reader__side-panel--hidden": !isVisible },
        className
      )}
      {...extraProps}
    >
      {renderDragHandle()}
      {closeButton && renderCloseButton()}
      {header && <h2 className="pdf-reader__side-panel-title">{header}</h2>}
      {content && (
        <div className="pdf-reader__side-panel-content">{content}</div>
      )}
      {footer && <div className="pdf-reader__side-panel-footer">{footer}</div>}
      {children}
      {isOverlayVisible && <div className="pdf-reader__side-panel-overlay" />}
    </div>
  );
};
