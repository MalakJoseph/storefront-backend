import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
};

export { auth };
