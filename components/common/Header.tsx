'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 및 화면 크기 변경 시 호출
    handleResize();
    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Container>
      <Wrapper>
        <Link href="/">
          <Logo>
            {windowWidth > 375 ? (
              <Image
                src="/images/LogoLarge.png"
                alt="TodoList"
                width={151}
                height={40}
              />
            ) : (
              <Image
                src="/images/LogoSmall.png"
                alt="TodoList"
                width={71}
                height={40}
              />
            )}
          </Logo>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 60px;
  padding: 10px 16px;
  min-width: 1200px;
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(226, 232, 240, 1);

  @media (min-width: 480px) and (max-width: 1024px) {
    padding: 10px 24px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-start;
`;
const Logo = styled.div`
  width: auto;
  height: 40px;
`;
