export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export type CreateUser = Omit<User, "id">;
