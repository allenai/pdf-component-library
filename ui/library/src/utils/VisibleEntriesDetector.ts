const DEFAULT_ROOT_MARGIN = '50px';
const DEFAULT_THRESHOLD = 0.00001;

export type SetVisibleEntriesCallback<TEntry> = (visible: Map<TEntry, number>) => void;
export type onVisibleEntriesChangeCallback<TEntry> = (args: {
  visibleEntries: IntersectionObserverEntry[];
  hiddenEntries: IntersectionObserverEntry[];
  lastEntries: Map<TEntry, number>;
}) => Map<TEntry, number>;

export default class VisibilityEntriesDetector<TEntry> {
  _root: Element;
  _observer: IntersectionObserver;
  _lastVisibleEntries: Map<TEntry, number>;
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
    this._lastVisibleEntries = new Map();
    this._setVisibleEntries = setVisibleEntries;
    this._onVisibleEntriesChange = onVisibleEntriesChange;
    this._observer = new IntersectionObserver(
      entries => {
        // Collect visible and hidden elements
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        const hiddenEntries = entries.filter(entry => !entry.isIntersecting);

        // this to get the highest value for max intersection ratio but if there is no element in the
        // visibleEntries then we need second param to be 0 so we dont have negative infinity
        const maxRatio = Math.max(...visibleEntries.map(entry => entry.intersectionRatio), 0);

        const actualVisibleEntry = visibleEntries.filter(
          entry => entry.intersectionRatio === maxRatio
        );

        // Determine what needs saved
        const newVisibleEntries = this._onVisibleEntriesChange({
          visibleEntries: actualVisibleEntry,
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
