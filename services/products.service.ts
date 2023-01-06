import { config } from "../config";
import { query } from "./db.service";

export const getManyProducts = (page = 1) => {
  const offset = (page - 1) * config.itemsPerPage;
  const data = query(`SELECT * FROM Products LIMIT ?,?`, [offset, config.itemsPerPage]);
  const meta = { page };

  return {
    data,
    meta,
  };
};
