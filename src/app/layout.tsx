import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import { Layout, Menu } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Link from "next/link";
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Frontend quiz app with Next.js, Antd, Swagger API",
};

const menuItems = [
  { key: "home", label: <Link href="/">Главная</Link> },
  { key: "disciplines", label: <Link href="/disciplines">Дисциплины</Link> },
  { key: "profile", label: <Link href="/profile">Профиль</Link> },
  { key: "login", label: <Link href="/login">Вход</Link> },
  { key: "signup", label: <Link href="/sign-up">Регистрация</Link> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntdRegistry>
          <Layout style={{ minHeight: "100vh" }}>
            <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
              <div className="font-bold text-lg text-blue-600">
                <Link href="/">Quiz App</Link>
              </div>
              <Menu
                mode="horizontal"
                items={menuItems}
                className="flex-1 min-w-0 justify-end"
                style={{ borderBottom: "none" }}
              />
            </header>
            <main className="p-4 sm:p-8 bg-gray-50 flex-1">{children}</main>
            <footer className="text-center text-xs text-gray-400 py-4">
              © {new Date().getFullYear()} Quiz App
            </footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
