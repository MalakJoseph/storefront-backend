import { NextFunction, Request, Response } from "express";

function errorHandler(
  err: { message: string; status: number },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  res.status(err.status || 500);
  res.send({ error: err.message || "Something went wrong" });
}

export { errorHandler };
