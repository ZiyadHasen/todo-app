export enum Role {
  USER = "user",
  ADMIN = "admin",
}
export enum Status {
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export type User = {
  _id: string; // MongoDB automatically adds this
  name: string;
  role: Role;
  email: string;
  password: string;
  phone: string;
  birthYear: number;
};
