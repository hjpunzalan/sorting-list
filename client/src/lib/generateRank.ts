/**
 * Helper to check three edge cases:
 *
 * - first item
 * - middle item
 * - last item
 *
 * Generate rank based on the case.
 */

import { LexoRank } from "lexorank";

export function generateRank(
  list: { order: string }[],
  oldIndex: number,
  destinationIndex: number
) {
  if (destinationIndex === 0) {
    return LexoRank.parse(list[destinationIndex].order).genPrev();
  } else if (destinationIndex === list.length - 1) {
    return LexoRank.parse(list[destinationIndex].order).genNext();
  } else {
    const previousEntity = list[destinationIndex];
    const offset = oldIndex > destinationIndex ? -1 : 1;
    const nextEntity = list[destinationIndex + offset];
    return LexoRank.parse(nextEntity.order).between(LexoRank.parse(previousEntity.order));
  }
}
