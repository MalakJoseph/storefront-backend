export type OrderProducts = {
  id: number;
  product_id: number;
  order_id: number;
  quantity: number;
};

export type AddOrderProducts = Omit<OrderProducts, "id">;

export type UpdateOrderProducts = Omit<OrderProducts, "product_id">;
