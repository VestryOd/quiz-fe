"use client";

import { Typography } from "antd";
import Link from "next/link";
import { useGetDisciplines } from "@/api/discipline/discipline";
import { List, Spin } from "antd";
import type { Discipline } from "@/api/model/discipline";

export default function DisciplinesPage() {
  const { data, isLoading } = useGetDisciplines();

  if (isLoading) return <Spin />;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Typography.Title level={2}>Дисциплины</Typography.Title>
      <Typography.Paragraph>
        Здесь будет список всех доступных дисциплин. Выберите дисциплину для
        просмотра теории, практики или квизов.
      </Typography.Paragraph>
      <List
        dataSource={data || []}
        renderItem={(item: Discipline) => (
          <List.Item>
            <Link href={`/disciplines/${item.link_name}?tab=theory`}>
              {item.name}
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
