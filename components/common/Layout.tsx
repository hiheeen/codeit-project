'use client';
import styled from 'styled-components';

// 공통 레이아웃 컴포넌트. 서버 컴포넌트 내에서 사용하기 위해 클라이언트 컴포넌트 생성하였습니다.
const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  background-color: #f9fafb;
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
export default Layout;
