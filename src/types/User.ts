export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export type AddUserType = Omit<UserType, "id">;
