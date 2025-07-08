import {
  CodeContent,
  ListContent,
  TableContent,
  TextContent,
} from '@/app/disciplines/[disciplineId]/TheoryItem/components';
import { TheoryItemProps } from '@/app/disciplines/[disciplineId]/TheoryItem/TheoryItem.model';
import { FC } from 'react';
import { Typography } from "antd";
import { TheoryItemTypes } from "@/api/model/theoryItemTypes";
import styles from "./TheoryItem.module.css";

export const TheoryItem: FC<TheoryItemProps> = ({
  item,
  previewMode,
}) => {
  if (previewMode) {
    return (
      <Typography.Title level={5} style={{ margin: 0 }}>
        {item.title || "Без названия"}
      </Typography.Title>
    );
  }

  const sortedContent = [...item.content].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.theoryItemRoot}>
      <Typography.Title level={3}>{item.title || "Без названия"}</Typography.Title>
      {sortedContent.map((block) => {
        if (!block) return null;
        const { content_type, content_data, id } = block;
        if (content_type === TheoryItemTypes.text && typeof content_data === "string") {
          return <TextContent data={content_data} key={id + "-text"} />;
        }
        if (content_type === TheoryItemTypes.code && typeof content_data === "string") {
          return <CodeContent data={content_data} key={id + "-code"} />;
        }
        if (content_type === TheoryItemTypes.list && Array.isArray(content_data)) {
          return <ListContent data={content_data as string[]} key={id + "-list"} />;
        }
        if (content_type === TheoryItemTypes.table && Array.isArray(content_data)) {
          return <TableContent data={content_data as string[][]} key={id + "-table"} />;
        }
        return null;
      })}
    </div>
  );
};
