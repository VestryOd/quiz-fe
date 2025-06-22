"use client";

import { Form, Input, Button, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostAuthSignUp } from "@/api/authentication/authentication";

export default function SignUpPage() {
  const router = useRouter();
  const { mutate: signUp, isPending } = usePostAuthSignUp();

  const onFinish = (values: any) => {
    // The API expects user_name, user_email, user_password.
    // The 'confirm' field is only for UI validation and should not be sent.
    const { confirm, ...apiValues } = values;

    signUp(
      { data: apiValues },
      {
        onSuccess: () => {
          message.success("Регистрация прошла успешно! Теперь вы можете войти.");
          router.push("/login");
        },
        onError: (error: any) => {
          console.error("Failed to sign up:", error);
          const errorMessage =
            error.response?.data?.message || "Произошла ошибка при регистрации.";
          message.error(errorMessage);
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Typography.Title level={2}>Регистрация</Typography.Title>
      <Form
        name="sign-up"
        layout="vertical"
        className="w-full max-w-sm"
        onFinish={onFinish}
      >
        <Form.Item
          label="Имя"
          name="user_name"
          rules={[{ required: true, message: "Введите имя!", min: 2 }]}
        >
          <Input autoComplete="name" />
        </Form.Item>
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
          rules={[{ required: true, message: "Введите пароль!", min: 6 }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label="Подтвердите пароль"
          name="confirm"
          dependencies={["user_password"]}
          rules={[
            { required: true, message: "Подтвердите пароль!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("user_password") === value) {
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
          <Button type="primary" htmlType="submit" block loading={isPending}>
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
