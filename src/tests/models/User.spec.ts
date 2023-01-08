import { User } from "../../models";
import { AddUserType, UserType } from "../../types";

const user = new User();

let userID = 1;
const userToAdd: AddUserType = {
  firstname: "Malak",
  lastname: "Joseph",
  password: "123123",
};
const fullUser: UserType = { ...userToAdd, id: userID };

describe("User Model Suite", () => {
  it("Should add a user", async () => {
    const result = await user.addUser(userToAdd);
    userID = result.id;

    expect(result).toEqual(fullUser);
  });
});
