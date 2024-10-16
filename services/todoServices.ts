import { TodoType } from '@/components/todo/TodoList';
import axiosInstance from '@/lib/axiosInstance';

// 완료 여부 상태변경 PATCH
export const toggleTodoStatus = async (id: number, isCompleted: boolean) => {
  const response = await axiosInstance.patch(`/items/${id}`, { isCompleted });
  return response.data;
};

// 모든 리스트 GET
export const getTodos = async (): Promise<TodoType[]> => {
  const response = await axiosInstance.get('/items');
  return response.data;
};
