const DEFAULT_ROOT_MARGIN = '50px';
const DEFAULT_THRESHOLD = 0.00001;

export type SetVisibleEntriesCallback<TEntry> = (visible: Set<TEntry>) => void;
export type onVisibleEntriesChangeCallback<TEntry> = (args: {
  visibleEntries: IntersectionObserverEntry[];
  hiddenEntries: IntersectionObserverEntry[];
  lastEntries: Set<TEntry>;
}) => Set<TEntry>;

export default class VisibleEntriesDetector<TEntry> {
  _root: Element;
  _observer: IntersectionObserver;
  _lastVisibleEntries: Set<TEntry>;
  _setVisibleEntries: SetVisibleEntriesCallback<TEntry>;
  _onVisibleEntriesChange: onVisibleEntriesChangeCallback<TEntry>;

  constructor({
    root,
    setVisibleEntries,
    onVisibleEntriesChange,
  }: {
    root: Element;
    setVisibleEntries: SetVisibleEntriesCallback<TEntry>;
    onVisibleEntriesChange: onVisibleEntriesChangeCallback<TEntry>;
  }) {
    this._root = root;
    this._lastVisibleEntries = new Set();
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

        const frozenEntries = new Set(newVisibleEntries);
        Object.freeze(frozenEntries);
        this._lastVisibleEntries = frozenEntries;
        this._setVisibleEntries(frozenEntries);
      },
      {
        root: this._root,
        rootMargin: DEFAULT_ROOT_MARGIN,
        threshold: DEFAULT_THRESHOLD,
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
