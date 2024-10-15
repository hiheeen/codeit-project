'use client';
import Image, { StaticImageData } from 'next/image';
import styled from 'styled-components';
// 재사용 가능한 버튼 컴포넌트. 배경색과 텍스트 컬러 등을 동적으로 받도록 설정.
// styled-component사용하여 props를 받아서 커스터마이징 가능하게 함.

interface IButtonProps {
  children: React.ReactNode;
  bgcolor?: string;
  textcolor?: string;
  imageSrc?: StaticImageData;
  handleClick: () => Promise<void>;
}

const Container = styled.button<{
  bgcolor?: string;
  textcolor?: string;
}>`
  all: unset;
  border: 2px solid rgba(15, 23, 42, 1);
  /* font-size: 16px; */
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 56px;
  box-shadow: 2px 2px 0px #0f172a;
  background-color: ${({ theme, bgcolor }) =>
    bgcolor ? theme.colors[bgcolor] : theme.colors.slate200};
  color: ${({ theme, textcolor }) =>
    textcolor ? theme.colors[textcolor] : theme.colors.slate700};
`;
const Button = ({
  handleClick,
  children,
  bgcolor,
  textcolor,
  imageSrc,
}: IButtonProps) => {
  return (
    <Container onClick={handleClick} bgcolor={bgcolor} textcolor={textcolor}>
      {imageSrc && <Image src={imageSrc} alt="icon" width={16} height={16} />}
      {children}
    </Container>
  );
};

export default Button;
