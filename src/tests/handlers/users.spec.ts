import supertest from "supertest";
import { firstUser } from "../../consts";
import app from "../../server";

const request = supertest(app);

const userID = 1;
let userToken = "Bearer ";

describe("Users Handler Suite", () => {
  it("Should create a user successfully", async () => {
    const result = await request.post("/users").send(firstUser);
    userToken += result.body.token;

    expect(result.statusCode).toBe(201);
  });

  it("Should fetch all users successfully", async () => {
    const result = await request.get("/users").set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  it("Should fetch user by id successfully", async () => {
    const result = await request
      .get(`/users/${userID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });

  it("Should delete user by id successfully", async () => {
    const result = await request
      .delete(`/users/${userID}`)
      .set("Authorization", userToken);

    expect(result.statusCode).toBe(200);
  });
});
