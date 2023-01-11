import { Application, NextFunction, Request, Response } from "express";
import { Order } from "../models";

const order = new Order();

async function CreateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { user_id, status } = req.body;

    if (!user_id) {
      throw new Error("Input is missing");
    }

    const result = await order.CreateOrder({
      user_id,
      status,
    });

    res.status(201).json(result);
  } catch (error: any) {
    next({ status: 400, message: error.message });
  }
}

async function getOrders(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await order.getOrders();
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function getOrderByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await order.getOrderByID(+req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function DeleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await order.DeleteOrder(+req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

const ordersRoutes = (app: Application) => {
  app.post("/orders", CreateOrder);
  app.get("/orders", getOrders);
  app.get("/orders/show/:id", getOrderByID);
  app.delete("/orders/delete/:id", DeleteOrder);
};

export { ordersRoutes };
