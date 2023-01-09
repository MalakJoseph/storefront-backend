import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenSecret: string = process.env.TOKEN_SECRET as string;

export const verifyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);

    next();
  } catch (error) {
    res.status(401);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateToken = (body: any): string => {
  return jwt.sign(body, tokenSecret);
};
