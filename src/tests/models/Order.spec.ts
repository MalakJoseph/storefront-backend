import { Order, User } from "../../models";
import { firstOrder, userCredentials } from "../../consts";

const order = new Order();
const user = new User();

let userID: number;
let orderID: number;
let created_at: Date;

describe("Order Model Suite", () => {
  beforeAll(async () => {
    userID = (await user.createUser(userCredentials)).id;
  });

  it("Should add an order", async () => {
    const result = await order.CreateOrder({ ...firstOrder, user_id: userID });
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
    const result = await order.DeleteOrder(orderID);
    expect(result.id).toBe(orderID);
  });
});
