"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import { Button, Layout, Menu, Spin } from "antd";
import Link from "next/link";
import "@/app/globals.css";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    { key: "home", label: <Link href="/">Главная</Link> },
    { key: "disciplines", label: <Link href="/disciplines">Дисциплины</Link> },
    {
      key: "profile",
      label: <Link href="/profile">Профиль</Link>,
      style: { display: isAuthenticated ? "block" : "none" },
    },
    {
      key: "login",
      label: <Link href="/login">Вход</Link>,
      style: { display: !isAuthenticated ? "block" : "none" },
    },
    {
      key: "signup",
      label: <Link href="/sign-up">Регистрация</Link>,
      style: { display: !isAuthenticated ? "block" : "none" },
    },
    {
      key: "logout",
      label: (
        <Button type="primary" onClick={logout} size="small">
          Выход
        </Button>
      ),
      style: { display: isAuthenticated ? "block" : "none" },
    },
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Layout style={{ minHeight: "100vh" }}>
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
          <div className="font-bold text-lg text-blue-600">
            <Link href="/">Quiz App</Link>
          </div>
          {!isClient ? (
            <Spin size="small" />
          ) : (
            <Menu
              mode="horizontal"
              items={menuItems}
              className="flex-1 min-w-0 justify-end"
              style={{ borderBottom: "none" }}
            />
          )}
        </header>
        <main className="p-4 sm:p-8 bg-gray-50 flex-1">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-4">
          © {new Date().getFullYear()} Quiz App
        </footer>
      </Layout>
    </div>
  );
}
