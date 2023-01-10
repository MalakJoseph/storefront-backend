import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenSecret: string = process.env.TOKEN_SECRET as string;

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Not authorized");
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
