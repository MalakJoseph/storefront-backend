import { Application, NextFunction, Request, Response } from "express";
import { auth } from "../middlewares";
import { OrderProductsModel } from "../models";
import { AddOrderProducts, UpdateOrderProducts } from "../types";

const orderProducts = new OrderProductsModel();

async function addOrderProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order_id = +req.params.order_id;
    const product_id = +req.body.product_id;
    const quantity = +req.body.quantity;
    const orderProductData: AddOrderProducts = {
      order_id,
      product_id,
      quantity,
    };

    if (!product_id) {
      throw new Error("Missing inputs");
    }

    const result = await orderProducts.addOrderProducts(orderProductData);

    res.status(201).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 400, message: error.message });
  }
}

async function getOrderProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order_id = +req.params.order_id;
    const result = await orderProducts.getOrderProducts(order_id);

    if (!result[0]?.id) {
      next({ status: 404, message: "Not found" });
    }

    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ message: error.message });
  }
}

async function updateOrderProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order_id = +req.params.order_id;
    const order_product_id = +req.params.order_product_id;
    const quantity = +req.body.quantity;

    if (!quantity) {
      throw new Error("Missing inputs");
    }

    const orderProductData: UpdateOrderProducts = {
      id: order_product_id,
      order_id,
      quantity,
    };

    const result = await orderProducts.updateOrderProducts(orderProductData);

    if (!result?.id) {
      next({ status: 404, message: "Not found" });
    }

    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ message: error.message });
  }
}

async function deleteOrderProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order_product_id = +req.params.order_product_id;
    const result = await orderProducts.deleteOrderProducts(order_product_id);

    if (!result?.id) {
      next({ status: 404, message: "Not found" });
    }

    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ message: error.message });
  }
}

const orderProductsRoutes = (app: Application) => {
  app.post("/orders/:order_id", auth, addOrderProducts);
  app.get("/orders/:order_id/order-products", auth, getOrderProducts);
  app.put(
    "/orders/:order_id/order-products/:order_product_id",
    auth,
    updateOrderProducts
  );
  app.delete(
    "/orders/:order_id/order-products/:order_product_id",
    auth,
    deleteOrderProducts
  );
};

export { orderProductsRoutes };
