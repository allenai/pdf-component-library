import { Nullable } from "../components/types/utils";
import { VisibleEntryDetailType } from "./VisibleEntriesDetector";

type VisibleElement<TEntry> = Nullable<TEntry>;

export function getMaxVisibleElement<TEntry>(
  visibleElements: Map<VisibleElement<TEntry>, VisibleEntryDetailType>
): VisibleElement<TEntry> {
  let maxVisibleKey = null;
  let maxRatio = 0;
  for (const [visibleKey, { ratio }] of visibleElements) {
    if (maxRatio < ratio) {
      maxVisibleKey = visibleKey;
      maxRatio = ratio;
    }
  }
  return maxVisibleKey;
}
