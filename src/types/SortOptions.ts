export const ITEM_SORT_OPTIONS = {
  recent: "최신순",
  favorite: "좋아요순",
} as const;

export type ItemSortOptions = typeof ITEM_SORT_OPTIONS;
export type ItemSortOptionsKeys = keyof typeof ITEM_SORT_OPTIONS;
export type ItemSortOptionsValues =
  (typeof ITEM_SORT_OPTIONS)[ItemSortOptionsKeys];

export const POST_SORT_OPTIONS = {
  recent: "최신순",
  like: "좋아요순",
} as const;

export type PostSortOptions = typeof POST_SORT_OPTIONS;
export type PostSortOptionsKeys = keyof typeof POST_SORT_OPTIONS;
export type PostSortOptionsValues =
  (typeof POST_SORT_OPTIONS)[PostSortOptionsKeys];
