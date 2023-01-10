import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/users";
import { errorHandler } from "./middlewares";

const app: express.Application = express();
const address = "http://localhost:3000";

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

userRoutes(app);

app.use(errorHandler);

app.listen(3000, function () {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`);
});

export default app;
