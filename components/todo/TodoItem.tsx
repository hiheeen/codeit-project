import styled from 'styled-components';
import CheckBox from '../../public/images/CheckBox.png';
import CheckBoxDone from '../../public/images/CheckBoxDone.png';
import Image from 'next/image';
import Link from 'next/link';
import { TodoType } from './TodoList';
interface ITodoItemProps {
  handleToggle: () => Promise<void>;
  todo: TodoType;
}

const TodoItem = ({ todo, handleToggle }: ITodoItemProps) => {
  const { id, name, isCompleted } = todo;
  const handleClickItem = () => {};
  return (
    <Container onClick={handleClickItem} $iscompleted={isCompleted}>
      {isCompleted ? (
        <Image
          onClick={handleToggle}
          src={CheckBoxDone}
          alt="완료된 체크박스"
          width={32}
          height={32}
        />
      ) : (
        <Image
          onClick={handleToggle}
          src={CheckBox}
          alt="체크박스"
          width={32}
          height={32}
        />
      )}
      <Name>
        <Link href={`/items/${id}`} prefetch>
          {name}
        </Link>
      </Name>
    </Container>
  );
};

export default TodoItem;

// 상위 div 스타일
const Container = styled.div<{ $iscompleted: boolean }>`
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;
  width: 100%;
  height: 50px;
  border-radius: 27px;
  border: 2px solid ${({ theme }) => theme.colors.slate900};
  display: flex;
  align-items: center;
  padding: 9px;
  background-color: ${({ $iscompleted, theme }) =>
    $iscompleted
      ? theme.colors.violet100
      : theme.colors.white}; /* 완료 상태에 따른 배경색 */
  text-decoration: ${({ $iscompleted }) =>
    $iscompleted
      ? 'line-through'
      : 'none'}; /* 완료 상태에 따른 텍스트 데코레이션 */
  /* transition: background-color 0.3s ease, text-decoration 0.3s ease; */
`;

const Name = styled.div`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.slate800};
`;
