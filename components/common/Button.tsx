'use client';
import Image, { StaticImageData } from 'next/image';
import styled from 'styled-components';
// 재사용 가능한 버튼 컴포넌트. 배경색과 텍스트 컬러 등을 동적으로 받도록 설정.
// styled-component사용하여 props를 받아서 커스터마이징 가능하게 함.

interface IButtonProps {
  text: string;
  $bgcolor?: string;
  $textcolor?: string;
  imageSrc?: StaticImageData;
  handleClick: () => Promise<void>;
  classNameString?: string;
}

const Container = styled.button<{
  $bgcolor?: string;
  $textcolor?: string;
  $class?: string;
}>`
  all: unset;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid rgba(15, 23, 42, 1);
  & > *:first-child {
    margin-right: 5px;
  }
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;

  @media (max-width: 376px) {
    width: ${({ $class }) => ($class ? '56px' : '168px')};
    min-width: 56px;
    .text {
      display: none;
    }
  }
  height: 52px;
  box-shadow: 2px 2px 0px #0f172a;
  background-color: ${({ theme, $bgcolor }) =>
    $bgcolor ? theme.colors[$bgcolor] : theme.colors.slate200};
  color: ${({ theme, $textcolor }) =>
    $textcolor ? theme.colors[$textcolor] : theme.colors.slate700};
`;
const Button = ({
  handleClick,
  text,
  $bgcolor,
  $textcolor,
  imageSrc,
  classNameString,
}: IButtonProps) => {
  return (
    <Container
      onClick={handleClick}
      $bgcolor={$bgcolor}
      $textcolor={$textcolor}
      $class={classNameString}
    >
      {imageSrc && <Image src={imageSrc} alt="icon" width={16} height={16} />}
      <div className={classNameString}>{text}</div>
    </Container>
  );
};

export default Button;
