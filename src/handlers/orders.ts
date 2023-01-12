import { Application, NextFunction, Request, Response } from "express";
import { auth } from "../middlewares";
import { OrderModel } from "../models";

const order = new OrderModel();

async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { user_id, status } = req.body;

    if (!user_id) {
      throw new Error("Missing inputs");
    }

    const result = await order.createOrder({
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

async function deleteOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await order.deleteOrder(+req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

const ordersRoutes = (app: Application) => {
  app.post("/orders", auth, createOrder);
  app.get("/orders", auth, getOrders);
  app.get("/orders/:id", auth, getOrderByID);
  app.delete("/orders/:id", auth, deleteOrder);
};

export { ordersRoutes };
