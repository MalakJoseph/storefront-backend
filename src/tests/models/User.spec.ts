import { userCredentials } from "../../consts";
import { User } from "../../models";

const user = new User();

let userID: number;

describe("User Model Suite", () => {
  it("Should create a user", async () => {
    const result = await user.createUser(userCredentials);
    userID = result.id;
    expect(result).toEqual({ ...userCredentials, id: userID });
  });

  it("Should fetch all users", async () => {
    const result = await user.getUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userCredentials;
    expect(result).toContain({ ...rest, id: userID });
  });

  it("Should fetch user by id", async () => {
    const result = await user.getUserByID(userID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userCredentials;
    expect(result).toEqual({ ...rest, id: userID });
  });

  it("Should delete product by id", async () => {
    const result = await user.deleteUser(userID);
    expect(result.id).toBe(userID);
  });
});
