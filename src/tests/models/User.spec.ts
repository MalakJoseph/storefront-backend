import { firstUser } from "../../consts";
import { UserModel } from "../../models";

const user = new UserModel();

let userID: number;

describe("User Model Suite", () => {
  it("Should create a user", async () => {
    const result = await user.createUser(firstUser);
    userID = result.id;
    expect(result).toEqual({ ...firstUser, id: userID });
  });

  it("Should fetch all users", async () => {
    const result = await user.getUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = firstUser;
    expect(result).toContain({ ...rest, id: userID });
  });

  it("Should fetch user by id", async () => {
    const result = await user.getUserByID(userID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = firstUser;
    expect(result).toEqual({ ...rest, id: userID });
  });

  it("Should delete product by id", async () => {
    const result = await user.deleteUser(userID);
    expect(result.id).toBe(userID);
  });
});
