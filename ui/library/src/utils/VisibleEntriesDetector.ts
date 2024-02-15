import { Nullable } from "../components/types/utils";
import { getMaxVisibleElement } from "./MaxVisibleElement";

const DEFAULT_ROOT_MARGIN = "50px";
const DEFAULT_THRESHOLD = Array.from({ length: 101 }).map((_, i) => i / 100);

export type SetVisibleEntriesCallback<TEntry> = (
  visible: Map<TEntry, VisibleEntryDetailType>
) => void;

export type onVisibleEntriesChangeCallback<TEntry> = (args: {
  visibleEntries: IntersectionObserverEntry[];
  hiddenEntries: IntersectionObserverEntry[];
  lastEntries: Map<TEntry, VisibleEntryDetailType>;
}) => Map<TEntry, VisibleEntryDetailType>;

export type VisibleEntryDetailType = {
  ratio: number;
  timestamp: number;
};

export default class VisibleEntriesDetector<TEntry> {
  _root: Element;
  _observer: IntersectionObserver;
  _lastVisibleEntries: Map<TEntry, VisibleEntryDetailType>;
  _setVisibleEntries: SetVisibleEntriesCallback<TEntry>;
  _onVisibleEntriesChange: onVisibleEntriesChangeCallback<TEntry>;
  _lastMostVisibleElement: Nullable<TEntry>;

  constructor({
    root,
    thresHold,
    setVisibleEntries,
    onVisibleEntriesChange,
  }: {
    root: Element;
    thresHold?: number | Array<number>;
    setVisibleEntries: SetVisibleEntriesCallback<TEntry>;
    onVisibleEntriesChange: onVisibleEntriesChangeCallback<TEntry>;
  }) {
    this._root = root;
    this._lastVisibleEntries = new Map();
    this._setVisibleEntries = setVisibleEntries;
    this._onVisibleEntriesChange = onVisibleEntriesChange;
    this._lastMostVisibleElement = null;
    this._observer = new IntersectionObserver(
      (entries) => {
        // Collect visible and hidden elements
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        const hiddenEntries = entries.filter((entry) => !entry.isIntersecting);

        // Determine what needs saved
        const newVisibleEntries = this._onVisibleEntriesChange({
          visibleEntries,
          hiddenEntries,
          lastEntries: this._lastVisibleEntries,
        });

        const frozenEntries = new Map(newVisibleEntries);
        Object.freeze(frozenEntries);

        const newMaxVisibleElement = getMaxVisibleElement(newVisibleEntries);
        if (newMaxVisibleElement != this._lastMostVisibleElement) {
          this._setVisibleEntries(frozenEntries);
          this._lastMostVisibleElement = newMaxVisibleElement;
        }
        this._lastVisibleEntries = frozenEntries;
      },

      // Default setting for intersection observer
      {
        root: this._root.tagName?.toLowerCase() === "html" ? null : this._root,
        rootMargin: DEFAULT_ROOT_MARGIN,
        threshold: thresHold ? thresHold : DEFAULT_THRESHOLD,
      }
    );
  }

  observeNodes(selector: string): void {
    for (const node of this._root.querySelectorAll(selector)) {
      this._observer.observe(node);
    }
  }

  destroy(): void {
    this._observer.disconnect();
  }
}
