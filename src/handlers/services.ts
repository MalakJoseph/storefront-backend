import { Application, NextFunction, Request, Response } from "express";
import { Services } from "../services";
import { auth } from "../middlewares";
import { AddProductType, Category } from "../types";

const services = new Services();

async function addProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = req.body as AddProductType[];
    let isMandatoryPropsExist = false;

    for (let i = 0; i < products.length; i++) {
      if (!products[i].name || !products[i].price) {
        isMandatoryPropsExist = false;
        break;
      }
      isMandatoryPropsExist = true;
    }

    if (!isMandatoryPropsExist) {
      next({ status: 400, message: "Input is missing" });
    }

    const result = await services.addProducts(products);

    res.status(201).json(result);
  } catch (error: any) {
    next({ status: 404, message: `Bad inputs. ${error.message}` });
  }
}

async function topExpensive(req: Request, res: Response, next: NextFunction) {
  try {
    const count = parseInt(req.query.count as string);
    const result = await services.topExpensive(count);

    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 404, message: error.message });
  }
}

async function getProductsByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = req.query.category as Category;
    const products = await services.getProductsByCategory(category);
    const result = products?.length
      ? products
      : next({
          status: 404,
          message: `Sorry couldn't find any products with category ${category}`,
        });

    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 404, message: error.message });
  }
}

async function currentOrdersByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await services.currentOrdersByUser(+req.params.user_id);
    const result = products?.length
      ? products
      : next({
          status: 404,
          message: "Sorry couldn't find any products.",
        });

    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 404, message: error.message });
  }
}

async function placeOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await services.placeOrder(+req.params.order_id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 404, message: error.message });
  }
}

async function completedOrdersByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await services.completedOrdersByUser(+req.params.user_id);
    res.status(200).json(result);
  } catch (error: any) {
    next({ status: 404, message: error.message });
  }
}

const servicesRoutes = (app: Application) => {
  app.post("/products/bulk", auth, addProducts);
  app.get("/products/sort", topExpensive);
  app.get("/products/filter", getProductsByCategory);
  app.get("/orders/:user_id", auth, currentOrdersByUser);
  app.put("/orders/:order_id", auth, placeOrder);
  app.get("/orders/:user_id/completed", auth, completedOrdersByUser);
};

export { servicesRoutes };
