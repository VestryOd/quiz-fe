"use client";

import { Form, Input, Button, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostAuthSignUp } from "@/api/authentication/authentication";

type SignUpFormValues = {
  user_name: string;
  user_email: string;
  user_password: string;
  confirm: string;
};

function isAxiosError(error: unknown): error is import("axios").AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

export default function SignUpPage() {
  const router = useRouter();
  const { mutate: signUp, isPending } = usePostAuthSignUp();

  const onFinish = (values: SignUpFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm, ...apiValues } = values;
    signUp(
      { data: apiValues },
      {
        onSuccess: () => {
          message.success("Регистрация прошла успешно! Теперь вы можете войти.");
          router.push("/login");
        },
        onError: (error) => {
          let errorMessage = "Произошла ошибка при регистрации.";
          if (isAxiosError(error)) {
            const data = error.response?.data;
            if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
              errorMessage = data.message;
            }
          }
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
