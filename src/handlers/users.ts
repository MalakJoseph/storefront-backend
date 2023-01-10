import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { generateToken, verifyAuth } from "../utils";

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

const user = new User();

async function createUser(req: Request, res: Response) {
  try {
    const { firstname, lastname, password } = req.body;

    if (!firstname || !lastname || !password) {
      throw new Error("Input is missing");
    }

    const hashedPassword = bcrypt.hashSync(
      password + pepper,
      parseInt(saltRounds)
    );

    const result = await user.createUser({
      firstname,
      lastname,
      password: hashedPassword,
    });

    const token = generateToken(result);

    res.status(201).json(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

async function getUsers(_req: Request, res: Response) {
  try {
    const result = await user.getUsers();
    res.status(200).json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

async function getUserByID(req: Request, res: Response) {
  try {
    const result = await user.getUserByID(+req.params.id);
    res.status(200).json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

const userRoutes = (app: Application) => {
  app.post("/users", createUser);
  app.get("/users", verifyAuth, getUsers);
  app.get("/users/:id", verifyAuth, getUserByID);
};

export default userRoutes;
