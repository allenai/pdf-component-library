export type SetEntriesCallback<TEntry> = (visible: Set<TEntry>) => void;
export type OnVisibilityChangeCallback<TEntry> = (args: {
  visibleElements: Element[];
  hiddenElements: Element[];
  lastEntries: Set<TEntry>;
}) => Set<TEntry>;

export default class VisibilityDetector<TEntry> {
  _root: Element;
  _observer: IntersectionObserver;
  _lastEntries: Set<TEntry>;
  _setEntries: SetEntriesCallback<TEntry>;
  _onVisibilityChange: OnVisibilityChangeCallback<TEntry>;

  constructor({
    root,
    setEntries,
    onVisibilityChange,
  }: {
    root: Element;
    setEntries: SetEntriesCallback<TEntry>;
    onVisibilityChange: OnVisibilityChangeCallback<TEntry>;
  }) {
    this._root = root;
    this._lastEntries = new Set();
    this._setEntries = setEntries;
    this._onVisibilityChange = onVisibilityChange;
    this._observer = new IntersectionObserver(
      entries => {
        // Collect visible and hidden elements
        const visibleElements: Element[] = [];
        const hiddenElements: Element[] = [];
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleElements.push(entry.target);
          } else {
            hiddenElements.push(entry.target);
          }
        }

        // Determine what needs saved
        const newVisibleEntries = this._onVisibilityChange({
          visibleElements,
          hiddenElements,
          lastEntries: this._lastEntries,
        });
        const frozenEntries = new Set(newVisibleEntries);
        Object.freeze(frozenEntries);
        this._lastEntries = frozenEntries;
        this._setEntries(frozenEntries);
      },
      {
        root: this._root,
        rootMargin: '50px',
        threshold: 0.00001,
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
