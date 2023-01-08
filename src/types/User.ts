export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type SignupType = Omit<UserType, "id">;
