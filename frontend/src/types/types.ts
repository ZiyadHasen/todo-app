export interface Todo {
  _id: string;
  text: string;
  status: boolean; // true = completed, false = active
  userId: string; // better naming for clarity
  createdAt?: string; // optional timestamps for tracking
  updatedAt?: string;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type User = {
  _id: string;
  name: string;
  role: Role;
  email: string;
  password: string;
  phone?: string; // optional, not always required
  birthYear?: number; // optional, not always required
  createdAt?: string;
  updatedAt?: string;
};

// export type TodoResponse = {
//   msg: string;
//   todos: Todo[];
//   _id: string;
// };

export type CreateTodoResponse = {
  todo: Todo; // wrap created todo as an object
  message?: string;
};

// export type TodoSingleResponse = {
//   msg: string;
//   todo: Todo;
// };

export type UpdateTodoResponse = {
  msg: string;
  todo: Todo;
};

export type DeleteTodoResponse = {
  msg: string;
  deletedCount?: number; // useful for bulk deletes (like completed todos)
};
