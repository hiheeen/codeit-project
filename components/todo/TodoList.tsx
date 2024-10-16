'use client';
import { BASE_URL } from '@/app/constants';
import { useEffect, useState } from 'react';
import InputSection from '../InputSection';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import Image, { StaticImageData } from 'next/image';

import TodoTitle from '../../public/images/TodoTitle.png';
import DoneTitle from '../../public/images/DoneTitle.png';
import DoneEmptySmall from '../../public/images/DoneEmptySmall.png';
import DoneEmptyLarge from '../../public/images/DoneEmptyLarge.png';
import TodoEmptySmall from '../../public/images/TodoEmptySmall.png';
import TodoEmptyLarge from '../../public/images/TodoEmptyLarge.png';
import { useRouter } from 'next/navigation';

export type TodoType = {
  isCompleted: boolean;
  name: string;
  id: number;
};

const TodoList = ({ initialTodos }: { initialTodos: TodoType[] }) => {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const router = useRouter();
  // 체크박스 상태 변경 핸들러
  const handleToggle = async (id: number) => {
    // UI에 먼저 상태변경을 반영합니다.
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    // 서버에 변경된 상태를 PATCH 요청으로 전송합니다.
    try {
      const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: !todos.find(todo => todo.id === id)?.isCompleted,
        }),
      });
      const json = await response.json();
      console.log(json, 'toggle update 확인');
      router.refresh();
    } catch (error) {
      console.error('Failed to update the todo status on the server', error);
    }
  };

  // 완료되지 않은 할 일 목록
  const incompleteTodos = todos?.filter(todo => !todo.isCompleted);
  // 완료된 할 일 목록
  const completedTodos = todos?.filter(todo => todo.isCompleted);
  return (
    <div>
      <InputSection setTodos={setTodos} todos={todos} />
      <ListContainer>
        <List>
          <Image alt="todo title" src={TodoTitle} width={97} height={36} />
          {incompleteTodos.length !== 0 ? (
            incompleteTodos?.map(todo => (
              <TodoItem
                handleToggle={() => handleToggle(todo.id)}
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <EmptyDiv>
              <ResponsiveImage
                alt="empty image todo"
                $smallSrc={TodoEmptySmall}
                $largeSrc={TodoEmptyLarge}
              />
              <EmptyTextBox>
                <div>할 일이 없어요.</div>
                <div>TODO를 새롭게 추가해주세요!</div>
              </EmptyTextBox>
            </EmptyDiv>
          )}
        </List>
        <List>
          <Image alt="done title" src={DoneTitle} width={97} height={36} />
          {completedTodos.length !== 0 ? (
            completedTodos?.map(todo => (
              <TodoItem
                handleToggle={() => handleToggle(todo.id)}
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <EmptyDiv>
              <ResponsiveImage
                alt="done empty image"
                $smallSrc={DoneEmptySmall}
                $largeSrc={DoneEmptyLarge}
              />
              <EmptyTextBox>
                <div>아직 다 한 일이 없어요.</div>
                <div>해야 할 일을 체크해보세요!</div>
              </EmptyTextBox>
            </EmptyDiv>
          )}
        </List>
      </ListContainer>
    </div>
  );
};

export default TodoList;

const EmptyTextBox = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.slate400};
  font-size: 16px;
  font-weight: 700;
`;
const EmptyDiv = styled.div`
  @media (min-width: 745px) {
    margin-top: 64px;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ResponsiveImage = styled.div<{
  alt: string;
  $smallSrc: StaticImageData;
  $largeSrc: StaticImageData;
}>`
  width: 120px;
  height: 120px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ $smallSrc }) => $smallSrc.src});

  @media (min-width: 376px) {
    background-image: url(${({ $largeSrc }) => $largeSrc.src});
    width: 240px;
    height: 240px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 744px) {
    margin-top: 48px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (min-width: 376px) {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: flex-start;
  }
  @media (min-width: 745px) {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr; /* 두 개의 동일한 컬럼 */
    gap: 16px; /* 두 컬럼 간의 간격 */
    /* padding: 16px; */
  }
`;
