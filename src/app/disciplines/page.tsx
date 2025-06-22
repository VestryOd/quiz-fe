"use client";

import { Typography } from "antd";

export default function DisciplinesPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Typography.Title level={2}>Дисциплины</Typography.Title>
      <Typography.Paragraph>
        Здесь будет список всех доступных дисциплин. Выберите дисциплину для
        просмотра теории, практики или квизов.
      </Typography.Paragraph>
    </div>
  );
}
