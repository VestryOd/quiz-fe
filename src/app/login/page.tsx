"use client";

import { Form, Input, Button, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostAuthLogin } from "@/api/authentication/authentication";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = usePostAuthLogin();

  const onFinish = (values: any) => {
    login(
      { data: values },
      {
        onSuccess: (data) => {
          // Assuming the token is in data.token
          Cookies.set("accessToken", data.token, { expires: 7 }); // Save for 7 days
          message.success("Вход выполнен успешно!");

          // Invalidate queries that depend on auth status to refetch them
          queryClient.invalidateQueries();
          
          router.push("/profile");
        },
        onError: (error: any) => {
          console.error("Failed to login:", error);
          const errorMessage =
            error.response?.data?.message || "Ошибка входа. Проверьте учетные данные.";
          message.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Typography.Title level={2}>Вход</Typography.Title>
      <Form
        name="login"
        layout="vertical"
        className="w-full max-w-sm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="user_email"
          rules={[{ required: true, type: "email", message: "Введите корректный email!" }]}
        >
          <Input type="email" autoComplete="email" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="user_password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
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
