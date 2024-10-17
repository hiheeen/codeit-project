'use client';

import { useState } from 'react';
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
import { GetTodoResponseType } from '@/types';
import { toggleTodoStatus } from '@/services/todoServices';

// page - 서버 컴포넌트로부터 받아온 initialTodos를 해당 클라이언트 컴포넌트에서 사용합니다.
const TodoList = ({
  initialTodos,
}: {
  initialTodos: GetTodoResponseType[];
}) => {
  const [todos, setTodos] = useState<GetTodoResponseType[]>(initialTodos);
  const router = useRouter();
  // 체크박스 상태 변경 핸들러
  const handleToggle = async (id: number) => {
    // UI에 먼저 상태변경을 반영합니다. -> 즉각적인 상호작용
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    // 변경된 상태 PATCH 요청
    try {
      const response = await toggleTodoStatus(
        id,
        !todos.find(todo => todo.id === id)?.isCompleted
      );
      console.log('업데이트된 데이터:', response);
      // 바뀐 데이터를 서버 컴포넌트가 인지하도록 refresh합니다. -> 캐싱된 데이터로 인한 혼란 방지
      router.refresh();
    } catch (error) {
      console.error('toggle handler error', error);
    }
  };

  // 완료되지 않은 할 일 목록
  const incompleteTodos = todos?.filter(todo => !todo.isCompleted);
  // 완료된 할 일 목록
  const completedTodos = todos?.filter(todo => todo.isCompleted);
  return (
    <Container>
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
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: #ffffff; */
`;
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
  @media (min-width: 1025px) {
    margin-top: 64px;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// styled-component에 동적인 css값을 전달하기 위해서는
// DOM이 props로 인지하지 못하도록 변수 앞에 $을 붙입니다.
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

  @media (min-width: 480px) {
    background-image: url(${({ $largeSrc }) => $largeSrc.src});
    width: 240px;
    height: 240px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1024px) {
    margin-top: 48px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  @media (min-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  @media (min-width: 1025px) {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;
