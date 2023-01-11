import { UserType } from "./user";

export type Status = "active" | "completed";

export type OrderType = {
  id: number;
  status?: Status;
  user_id: UserType["id"];
  created_at: Date;
};

export type CreateOrderType = Pick<OrderType, "status" | "user_id">;
