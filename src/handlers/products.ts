import { Application, NextFunction, Request, Response } from "express";
import { Product } from "../models";
import { auth } from "../middlewares";

const product = new Product();

async function addProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      throw new Error("Input is missing");
    }

    const result = await product.addProduct({
      name,
      price,
      category,
    });

    res.status(201).json(result);
  } catch (error: any) {
    next({ status: 400, message: error.message });
  }
}

async function getProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.getProducts();
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function getProductByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.getProductByID(+req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await product.deleteProduct(+req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 401, message: error.message });
  }
}

const productsRoutes = (app: Application) => {
  app.post("/products", auth, addProduct);
  app.get("/products", getProducts);
  app.get("/products/:id", getProductByID);
  app.delete("/products/:id", auth, deleteProduct);
};

export { productsRoutes };
