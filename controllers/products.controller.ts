import express from "express";
import debug from "debug";
import path from "path";
import ProductService, { ProductResultSet, ProductsResultSet } from "../services/products.service";

import { getExceptionString } from "../helpers";
const log: debug.IDebugger = debug(`app:${path.parse(__filename).name}`);

export const getProduct = (req: express.Request, res: express.Response) => {
  log("getProduct");
  try {
    const productId: number = Number(req.params.productId) || 0;
    const ps = new ProductService();
    const product: ProductResultSet = ps.getProduct(productId);
    res.json(product);
  } catch (e: unknown) {
    console.log(getExceptionString(e));
  }
  return undefined;
};

export const getManyProducts = (req: express.Request, res: express.Response) => {
  log("getManyProducts");
  try {
    const page: number = Number(req.params.page) || 0;
    const ps = new ProductService();
    const products: ProductsResultSet = ps.getManyProducts(page);
    res.json(products);
  } catch (e: unknown) {
    console.log(getExceptionString(e));
  }
  return undefined;
};

// export const getUser = (userId: number): User | undefined => {
//   try {
//     const user: User = getFakeUser(userId);
//     return user;
//   } catch (e: unknown) {
//     console.log(getExceptionString(e));
//   }
//   return undefined;
// };
