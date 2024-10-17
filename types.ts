// Todo GET Response type
export type GetTodoResponseType = {
  isCompleted: boolean;
  name: string;
  id: number;
};

// Todo Detail GET Response type
export type GetTodoDetailResponseType = {
  isCompleted: boolean;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: number;
};

// Todo PATCH Response type
export type PatchTodoResponseType = {
  isCompleted: boolean;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: 0;
};

// Todo PATCH FormData type
export type PatchTodoDataType = {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
};

// Todo POST FORMData type
export type PostTodoDataType = {
  name: string;
};
