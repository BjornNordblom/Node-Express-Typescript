import sqlite from "better-sqlite3";
import path from "path";

const db = new sqlite(path.resolve("main.db"), { fileMustExist: true });

export const query = (sql: string, params: any[]) => {
  return db.prepare(sql).all(params);
};
