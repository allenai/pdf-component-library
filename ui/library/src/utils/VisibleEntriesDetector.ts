const DEFAULT_ROOT_MARGIN = '50px';
// This array is a range from 0.0001 to 1 range of threshold. It will help with detecting
// on scroll with a better % compare to a fix threshold but not firing too frequent that
// can hamper our performance.
const DEFAULT_THRESHOLD = [0.0001, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99];

export type SetVisibleEntriesCallback<TEntry> = (visible: Map<TEntry, number>) => void;
export type onVisibleEntriesChangeCallback<TEntry> = (args: {
  visibleEntries: IntersectionObserverEntry[];
  hiddenEntries: IntersectionObserverEntry[];
  lastEntries: Map<TEntry, number>;
}) => Map<TEntry, number>;

export default class VisibleEntriesDetector<TEntry> {
  _root: Element;
  _observer: IntersectionObserver;
  _lastVisibleEntries: Map<TEntry, number>;
  _setVisibleEntries: SetVisibleEntriesCallback<TEntry>;
  _onVisibleEntriesChange: onVisibleEntriesChangeCallback<TEntry>;

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
    this._observer = new IntersectionObserver(
      entries => {
        // Collect visible and hidden elements
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        const hiddenEntries = entries.filter(entry => !entry.isIntersecting);

        // Determine what needs saved
        const newVisibleEntries = this._onVisibleEntriesChange({
          visibleEntries,
          hiddenEntries,
          lastEntries: this._lastVisibleEntries,
        });

        const frozenEntries = new Map(newVisibleEntries);
        Object.freeze(frozenEntries);
        this._lastVisibleEntries = frozenEntries;
        this._setVisibleEntries(frozenEntries);
      },

      // Default setting for intersection observer
      {
        root: this._root.tagName?.toLowerCase() === 'html' ? null : this._root,
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
