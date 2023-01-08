import { userCredentials } from "../../consts";
import { User } from "../../models";
import { UserType } from "../../types";

const user = new User();

let userID = 1;
const fullUser: UserType = { ...userCredentials, id: userID };

describe("User Model Suite", () => {
  it("Should add a user", async () => {
    const result = await user.addUser(userCredentials);
    userID = result.id;
    expect(result).toEqual(fullUser);
  });

  it("Should fetch all users", async () => {
    const result = await user.getUsers();
    expect(result).toEqual([fullUser]);
  });

  it("Should fetch user by id", async () => {
    const result = await user.getUserById(userID);
    expect(result.id).toBe(fullUser.id);
  });
});
