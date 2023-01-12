import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares";
import {
  orderProductsRoutes,
  ordersRoutes,
  productsRoutes,
  servicesRoutes,
  userRoutes,
} from "./handlers";

const app: express.Application = express();
const address = "http://localhost:3000";

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Welcome to Storefront Backend!");
});

ordersRoutes(app);
orderProductsRoutes(app);
productsRoutes(app);
userRoutes(app);
servicesRoutes(app);

app.use(errorHandler);

app.listen(3000, function () {
  // eslint-disable-next-line no-console
  console.log(`starting app on: ${address}`);
});

export default app;
