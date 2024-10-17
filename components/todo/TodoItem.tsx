import styled from 'styled-components';
import CheckBox from '../../public/images/CheckBox.png';
import CheckBoxDone from '../../public/images/CheckBoxDone.png';
import Image from 'next/image';
import Link from 'next/link';
import { GetTodoResponseType } from '@/types';
interface ITodoItemProps {
  handleToggle: () => Promise<void>; // 완료 상태 변경 함수
  todo: GetTodoResponseType; // GET todoList => map으로 얻은 item 타입
}

const TodoItem = ({ todo, handleToggle }: ITodoItemProps) => {
  const { id, name, isCompleted } = todo;

  return (
    <Container $iscompleted={isCompleted}>
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
    $iscompleted ? theme.colors.violet100 : theme.colors.white};
  text-decoration: ${({ $iscompleted }) =>
    $iscompleted ? 'line-through' : 'none'};
`;

const Name = styled.div`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.slate800};
`;
