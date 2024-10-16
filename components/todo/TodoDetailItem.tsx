import styled from 'styled-components';
import CheckBox from '../../public/images/CheckBox.png';
import CheckBoxDone from '../../public/images/CheckBoxDone.png';
import Image from 'next/image';
import { TodoType } from './TodoList';
import { TodoDetailType } from './TodoDetail';
interface ITodoItemProps {
  //   handleToggle: () => Promise<void>;
  todo: TodoType;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  todoDetail: TodoDetailType;
  newName: string;
}

const TodoDetailItem = ({ todo, setNewName, newName }: ITodoItemProps) => {
  const { isCompleted } = todo;
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
  return (
    <Container $iscompleted={isCompleted}>
      <Image
        // onClick={handleToggle}
        src={isCompleted ? CheckBoxDone : CheckBox}
        alt="체크박스"
        width={32}
        height={32}
      />
      <Name>
        <NameInput value={newName} onChange={handleNameChange} />
      </Name>
    </Container>
  );
};

export default TodoDetailItem;
const NameInput = styled.input`
  all: unset;
  color: #0f172a;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

const Container = styled.div<{ $iscompleted: boolean }>`
  margin-top: 16px;
  font-size: 20px;
  width: 100%;
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.colors.slate900};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  background-color: ${({ $iscompleted, theme }) =>
    $iscompleted ? theme.colors.violet200 : theme.colors.white};
  text-decoration: underline;
`;

const Name = styled.div`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate800};
`;
