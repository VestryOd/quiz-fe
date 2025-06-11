'use client';

import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Typography.Title level={2}>Регистрация</Typography.Title>
      <Form
        name="sign-up"
        layout="vertical"
        className="w-full max-w-sm"
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя!" }]}
        >
          <Input autoComplete="name" />
        </Form.Item>
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
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label="Подтвердите пароль"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Подтвердите пароль!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Form.Item className="text-center mb-0">
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </Form.Item>
      </Form>
    </div>
  );
} 