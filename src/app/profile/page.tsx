'use client';

import { Typography } from "antd";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Typography.Title level={2}>Профиль пользователя</Typography.Title>
      <Typography.Paragraph>
        Здесь будет отображаться информация о вашем профиле, а также форма для запроса роли (Student/Teacher).
      </Typography.Paragraph>
    </div>
  );
} 