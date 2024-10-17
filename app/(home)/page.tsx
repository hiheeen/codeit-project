import { GetTodoResponseType } from '@/types';
import { BASE_URL } from '../constants';
import TodoList from '@/components/todo/TodoList';

async function getTodos(): Promise<GetTodoResponseType[]> {
  const response = await fetch(`${BASE_URL}/items`, {
    cache: 'no-store', // 매번 최신 데이터를 가져오기 위해 사용
  });

  return await response.json();
}
export default async function Home() {
  const todos = await getTodos();
  return (
    <div>
      <TodoList initialTodos={todos} />
    </div>
  );
}
