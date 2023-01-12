import { User } from "./user";

export type Status = "active" | "completed";

export type Order = {
  id: number;
  status?: Status;
  user_id: User["id"];
  created_at: Date;
};

export type CreateOrder = Pick<Order, "status" | "user_id">;
