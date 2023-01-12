import { Application, NextFunction, Request, Response } from "express";
import { ProductModel } from "../models";
import { auth } from "../middlewares";

const product = new ProductModel();

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      throw new Error("Missing inputs");
    }

    const result = await product.createProduct({
      name,
      price,
      category,
    });

    res.status(201).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 400, message: error.message });
  }
}

async function getProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.getProducts();
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function getProductByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.getProductByID(+req.params.id);
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.deleteProduct(+req.params.id);
    res.status(200).json(result);

    // No type can be asserted to the catch clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

const productsRoutes = (app: Application) => {
  app.post("/products", auth, createProduct);
  app.get("/products", getProducts);
  app.get("/products/show/:id", getProductByID);
  app.delete("/products/:id", auth, deleteProduct);
};

export { productsRoutes };
