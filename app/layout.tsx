import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '海燕 · 个人作品集',
  description: '海燕的剧本、影像与文字作品。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
