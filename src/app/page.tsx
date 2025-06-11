'use client';

import { Button, Typography, Space } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Typography.Title level={1} className="text-center">
        Добро пожаловать в Quiz App
      </Typography.Title>
      <Typography.Paragraph className="text-center max-w-xl">
        Платформа для подготовки к фронтенд-собеседованиям: теория, практика и квизы по дисциплинам. Войдите или зарегистрируйтесь, чтобы получить доступ к персональным возможностям.
      </Typography.Paragraph>
      <Space size="large">
        <Link href="/login">
          <Button type="primary" size="large">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button size="large">Sign Up</Button>
        </Link>
      </Space>
    </div>
  );
}
