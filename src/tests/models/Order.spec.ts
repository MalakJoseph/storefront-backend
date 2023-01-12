import { OrderModel, UserModel } from "../../models";
import { firstOrder, firstUser } from "../../consts";

const order = new OrderModel();
const user = new UserModel();

let userID: number;
let orderID: number;
let created_at: Date;

describe("Order Model Suite", () => {
  beforeAll(async () => {
    userID = (await user.createUser(firstUser)).id;
  });

  it("Should create an order", async () => {
    const result = await order.createOrder({ ...firstOrder, user_id: userID });
    orderID = result.id;
    created_at = result.created_at;

    expect(result).toEqual({
      ...firstOrder,
      id: orderID,
      user_id: userID,
      created_at,
    });
  });

  it("Should fetch all orders", async () => {
    const result = await order.getOrders();
    expect(result).toContain({
      ...firstOrder,
      id: orderID,
      user_id: userID,
      created_at,
    });
  });

  it("Should fetch order by id", async () => {
    const result = await order.getOrderByID(orderID);
    expect(result).toEqual({
      ...firstOrder,
      id: orderID,
      user_id: userID,
      created_at,
    });
  });

  it("Should delete order by id", async () => {
    const result = await order.deleteOrder(orderID);
    expect(result.id).toBe(orderID);
  });
});
