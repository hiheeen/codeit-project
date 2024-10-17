'use client';

import Button from './common/Button';
import AddSmall from '../public/images/AddSmall.png';
import AddSmallDark from '../public/images/AddSmallDark.png';
import styled from 'styled-components';
import { useState } from 'react';
import { GetTodoResponseType } from '@/types';
import { postTodo } from '@/services/todoServices';

interface IInputSectionProps {
  setTodos: React.Dispatch<React.SetStateAction<GetTodoResponseType[]>>;
  todos: GetTodoResponseType[];
}

const InputSection = ({ setTodos }: IInputSectionProps) => {
  const [todoValue, setTodoValue] = useState<string>('');
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값 감지
    setTodoValue(e.target.value);
  };
  const handleAddTodo = async () => {
    // 입력하지 않고 추가할 경우 예외처리
    if (todoValue.trim() === '') {
      alert('할 일을 입력해주세요');
      return;
    }
    const formData = {
      name: todoValue,
    };

    // 입력한 할 일 POST 요청
    try {
      const response = await postTodo(formData);
      const newTodo: GetTodoResponseType = {
        name: response.name,
        isCompleted: false,
        id: response.id,
      };
      // 클라이언트 배열에 추가하여 UI반영
      setTodos(todos => [...todos, newTodo]);
    } catch (error) {
      console.error('add todo error', error);
    }
    setTodoValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터키 감지
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };
  return (
    <Container>
      <Input
        onChange={handleChangeValue}
        placeholder="할 일을 입력해주세요"
        value={todoValue}
        onKeyDown={handleKeyPress}
      />
      <Button
        classNameString="text"
        handleClick={handleAddTodo}
        $bgcolor={todoValue ? 'violet600' : 'slate200'}
        $textcolor={todoValue ? 'white' : 'slate700'}
        text="추가하기"
        imageSrc={todoValue ? AddSmall : AddSmallDark}
      />
    </Container>
  );
};

export default InputSection;

const Input = styled.input`
  all: unset;
  font-size: 16px;
  font-weight: 400;
  color: #0f172a;
  line-height: 56px;
  background-color: #f1f5f9;
  border: 2px solid #0f172a;
  width: 100%;
  border-radius: 24px;
  margin-right: 16px;
  box-shadow: 2px 2px 0px #0f172a;
  height: 52px;
  padding: 0 24px;
  ::placeholder {
    color: #64748b;
  }
`;
const Container = styled.div`
  display: flex;
  padding-top: 24px;
`;
