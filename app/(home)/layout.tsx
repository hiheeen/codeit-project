'use client';

import styled from 'styled-components';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
// 배경색이 페이지마다 다른 것을 적용하기 위해 페이지 별 레이아웃을 적용하였습니다.
const Layout = styled.div`
  margin: 0 auto;
  padding: 0 16px; // 기본 모바일
  /* 태블릿 */
  @media (min-width: 480px) {
    padding: 0 24px;
  }

  /* 노트북 */
  @media (min-width: 1025px) {
    padding: 0;
  }
`;
