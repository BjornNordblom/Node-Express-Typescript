import sqlite from "better-sqlite3";
import path from "path";

class Db {
  private static _instance: Db;
  private db: sqlite.Database = new sqlite(path.resolve("main.db"), { fileMustExist: true });

  private constructor() {
    return;
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Db();
    return this._instance;
  }
  query(sql: string, params: unknown[]) {
    return this.db.prepare(sql).all(params);
  }
}

export default Db;
