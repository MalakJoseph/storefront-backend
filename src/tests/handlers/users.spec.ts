import supertest from "supertest";
import { userCredentials } from "../../consts";
import app from "../../server";

const request = supertest(app);

describe("User Handler Suite", () => {
  it("Should create a user sucessfully", async () => {
    const result = await request.post("/users").send(userCredentials);
    expect(result.statusCode).toBe(201);
  });
});
