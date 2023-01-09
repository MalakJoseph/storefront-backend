import { Application, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { generateToken } from "../utils";

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

const user = new User();

async function addUser(req: Request, res: Response) {
  try {
    const { firstname, lastname, password } = req.body;

    if (!firstname || !lastname || !password) {
      throw new Error("Input is missing");
    }

    const hashedPassword = bcrypt.hashSync(
      password + pepper,
      parseInt(saltRounds)
    );

    const result = await user.addUser({
      firstname,
      lastname,
      password: hashedPassword,
    });

    const token = generateToken(result);

    res.status(201).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

const userRoutes = (app: Application) => {
  app.post("/users", addUser);
};

export default userRoutes;
