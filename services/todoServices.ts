import axiosInstance from '@/lib/axiosInstance';
import {
  GetTodoResponseType,
  PatchTodoDataType,
  PatchTodoResponseType,
  PostTodoDataType,
} from '@/types';

// 완료 여부 상태변경 PATCH
export const toggleTodoStatus = async (
  id: number,
  isCompleted: boolean
): Promise<PatchTodoResponseType> => {
  const response = await axiosInstance.patch(`/items/${id}`, { isCompleted });
  return response.data;
};

// 모든 리스트 GET
export const getTodos = async (): Promise<GetTodoResponseType[]> => {
  const response = await axiosInstance.get('/items');
  return response.data;
};

// 할 일 생성 POST
export const postTodo = async (formData: PostTodoDataType) => {
  const response = await axiosInstance.post('/items', formData);
  return response.data;
};

// 이미지 url GET
export const getImageUrl = async (
  formData: FormData
): Promise<{ url: string }> => {
  const response = await axiosInstance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 할 일 수정 PATCH
export const updateItem = async (
  id: number,
  formData: PatchTodoDataType
): Promise<PatchTodoResponseType> => {
  const response = await axiosInstance.patch(`/items/${id}`, formData, {});
  return response.data; // 서버로부터 받은 데이터 반환
};

export const deleteItem = async (id: number) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};
