// metadata는 서버 컴포넌트, styled-component에서의 ThemeProvider는 클라이언트 컴포넌트에서만 사용 가능
// 둘을 같이 가져가기 위해 root-layout컴포넌트는 서버 컴포넌트로 유지하면서
// 별도의 ThemeProvider(client component)를 만들어 import하였음.

import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/common/Header';
import Layout from '@/components/common/Layout';

export const metadata: Metadata = {
  title: 'Todo Project',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Favicon.png" />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
