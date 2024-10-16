import { BASE_URL } from '@/app/constants';
import TodoDetail from '@/components/todo/TodoDetail';

async function getTodoDetail(itemId: string) {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    cache: 'no-store', // 매번 최신 데이터를 가져오기 위해 사용
  });

  return await response.json();
}
const TodoDetailPage = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  const todoDetail = await getTodoDetail(itemId);
  return (
    <div>
      <TodoDetail initialTodoDetail={todoDetail} />
    </div>
  );
};

export default TodoDetailPage;
