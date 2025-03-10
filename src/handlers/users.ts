import { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models";
import { auth } from "../middlewares";

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const tokenSecret = process.env.TOKEN_SECRET as string;

const user = new UserModel();

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstname, lastname, password } = req.body;

    if (!firstname || !lastname || !password) {
      throw new Error("Missing inputs");
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

    const token = jwt.sign(result, tokenSecret);

    res.status(201).json({ token, id: result.id });

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 400, message: error.message });
  }
}

async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await user.getUsers();
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function getUserByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await user.getUserByID(+req.params.id);
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await user.deleteUser(+req.params.id);
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

const userRoutes = (app: Application) => {
  app.post("/users", createUser);
  app.get("/users", auth, getUsers);
  app.get("/users/:id", auth, getUserByID);
  app.delete("/users/:id", auth, deleteUser);
};

export { userRoutes };
