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
    expect(result).toContain({ ...userCredentials, id: userID });
  });

  it("Should fetch user by id", async () => {
    const result = await user.getUserByID(userID);
    expect(result).toEqual({ ...userCredentials, id: userID });
  });
});
