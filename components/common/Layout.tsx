'use client';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  max-width: 1200px;
  @media (min-width: 376px) {
    padding: 0 24px;
    max-width: 696px;
  }

  /* 데스크탑 */
  @media (min-width: 1200px) {
    padding: 0;
  }
`;
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};
export default Layout;
