'use client';

import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Typography.Title level={2}>Вход</Typography.Title>
      <Form
        name="login"
        layout="vertical"
        className="w-full max-w-sm"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Введите email!" }]}
        >
          <Input type="email" autoComplete="email" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
        <Form.Item className="text-center mb-0">
          Нет аккаунта? <Link href="/sign-up">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </div>
  );
} 