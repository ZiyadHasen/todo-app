export interface Todo {
  id: string;
  text: string;
  status: boolean; // true = active, false = completed
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
  phone: string;
  birthYear: number;
};
