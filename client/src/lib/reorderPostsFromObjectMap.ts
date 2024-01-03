import { Posts } from "@/__generated__/graphql";

export default function reorderPostsFromObjectMap(
  list: Posts[],
  map: { [key: string]: string }
) {
  const result = Array.from(list);

  for (const [id, destinationOrder] of Object.entries(map)) {
    // Validate.
    if (typeof destinationOrder !== "string") continue;

    // Find item and reorder;
    const index = result.findIndex(item => item._id === id);

    if (index >= 0) {
      result[index] = {
        ...result[index],
        order: destinationOrder
      };
    }
  }

  return result;
}
