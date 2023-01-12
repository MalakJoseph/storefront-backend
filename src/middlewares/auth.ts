import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const tokenSecret: string = process.env.TOKEN_SECRET as string;

const auth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Not authorized");
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);

    next();

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
};

export { auth };
