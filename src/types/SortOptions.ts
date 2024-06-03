export const SORT_OPTIONS = {
  recent: "최신순",
  like: "좋아요순",
} as const;

export type SortOptions = typeof SORT_OPTIONS;
export type SortOptionsKeys = keyof typeof SORT_OPTIONS;
export type SortOptionsValues = (typeof SORT_OPTIONS)[SortOptionsKeys];
