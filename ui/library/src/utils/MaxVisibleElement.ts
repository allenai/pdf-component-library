import { Nullable } from '../components/types/utils';
import { VisibleEntryDetailType } from './VisibleEntriesDetector';

type VisibleElement = Nullable<number | string>;

export function getMaxVisibleElement(visibleElements: Map<VisibleElement, VisibleEntryDetailType>): VisibleElement {
  let maxVisibleKey = null;
  let maxRatio = 0;
  for (const [visibleKey, {ratio}] of visibleElements) {
    if (maxRatio < ratio) {
      maxVisibleKey = visibleKey;
      maxRatio = ratio;
    }
  }
  return maxVisibleKey;
}
