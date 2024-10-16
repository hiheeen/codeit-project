'use client';
import Link from 'next/link';
import LogoSmall from '../public/images/LogoSmall.png';
import LogoLarge from '../public/images/LogoLarge.png';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  @media (min-width: 376px) and (max-width: 744px) {
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
const Header = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // 브라우저의 화면 너비 변화 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 컴포넌트가 처음 마운트될 때 및 화면 크기 변경 시 호출
    handleResize(); // 초기 실행 (컴포넌트 마운트 시)
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열: 마운트 시 한 번만 실행
  return (
    <Container>
      <Wrapper>
        <Link href="/">
          {/* <ResponsiveImage/> */}
          <Logo>
            {windowWidth > 375 ? (
              <Image
                src={LogoLarge}
                alt="TodoList"
                width={151} // 기본 너비
                height={40} // 기본 높이
              />
            ) : (
              <Image
                src={LogoSmall}
                alt="TodoList"
                width={71} // 기본 너비
                height={40} // 기본 높이
              />
            )}
          </Logo>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Header;
