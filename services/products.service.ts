import debug from "debug";
import path from "path";
import { config } from "../config";
import Db from "./db.service";
import { Product } from "../models/product.model";
const log: debug.IDebugger = debug(`app:${path.parse(__filename).name}`);

export class MetaResult {
  page?: number;
  offset?: number;
}

export class ProductsResultSet {
  data: Product[];
  meta: Partial<MetaResult>;
  constructor(data: Product[], meta: Partial<MetaResult>) {
    this.data = data;
    this.meta = meta;
  }
}

export class ProductResultSet {
  data: Product;
  meta: Partial<MetaResult>;
  constructor(data: Product, meta: Partial<MetaResult>) {
    this.data = data;
    this.meta = meta;
  }
}

export default class ProductService {
  db = Db.getInstance();

  getManyProducts(page = 1) {
    log("getManyProducts");
    const offset = (page - 1) * config.itemsPerPage;
    const data = this.db.query(`SELECT * FROM Products LIMIT ?,?`, [offset, config.itemsPerPage]) as Product[];
    const meta = { page };

    return new ProductsResultSet(data, meta);
  }

  getProduct(productId: number) {
    log("getProduct");
    const data = this.db.query(`SELECT * FROM Products WHERE Id = ? LIMIT 1`, [productId]) as Product[];

    return new ProductResultSet(data[0], {});
  }
}

// export const getManyProducts = (page = 1) => {
//   const offset = (page - 1) * config.itemsPerPage;
//   const data = db.query(`SELECT * FROM Products LIMIT ?,?`, [offset, config.itemsPerPage]);
//   const meta = { page };

//   return {
//     data,
//     meta,
//   };
// };

// export const getProduct = (productId: number) => {
//   const data = db.query(`SELECT * FROM Products WHERE Id = ?`, [productId]);

//   return {
//     data,
//   };
// };
