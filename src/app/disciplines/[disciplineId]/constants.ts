export const TAB_KEYS = ["theory", "practice", "quiz"] as const;
export type TabKey = (typeof TAB_KEYS)[number];

export const TheoryItemTypes = {
  text: "text",
  code: "code",
  table: "table",
  list: "list",
} as const;
export type TheoryItemType =
  (typeof TheoryItemTypes)[keyof typeof TheoryItemTypes];

export interface Content {
  id: string;
  title?: string;
  content_type: TheoryItemType;
  parentId: string;
  order: number;
  content_data: string | string[];
  content_image?: string;
}
