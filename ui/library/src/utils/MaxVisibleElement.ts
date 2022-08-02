import { Nullable } from '../components/types/utils';

type VisibleElementKey = Nullable<number | string>;

export function getMaxVisibleElement(
  visibleElements: Map<VisibleElementKey, number>
): VisibleElementKey {
  let maxVisibleKey = null;
  let maxRatio = 0;
  for (const [visibleKey, ratio] of visibleElements) {
    if (maxRatio < ratio) {
      maxVisibleKey = visibleKey;
      maxRatio = ratio;
    }
  }
  return maxVisibleKey;
}
