import debug from "debug";
import path from "path";
import { config } from "../config";
import Db from "./db.service";
import { User } from "../models/user.model";
const log: debug.IDebugger = debug(`app:${path.parse(__filename).name}`);

export class MetaResult {
  page?: number;
  offset?: number;
}

export class UsersResultSet {
  data: User[];
  meta: Partial<MetaResult>;
  constructor(data: User[], meta: Partial<MetaResult>) {
    this.data = data;
    this.meta = meta;
  }
}

export class UserResultSet {
  data: User;
  meta: Partial<MetaResult>;
  constructor(data: User, meta: Partial<MetaResult>) {
    this.data = data;
    this.meta = meta;
  }
}
export default class UserService {
  db = Db.getInstance();

  getManyUsers(page = 1) {
    log("getManyUsers");
    const offset = (page - 1) * config.itemsPerPage;
    const data = this.db.query(`SELECT * FROM Users LIMIT ?,?`, [offset, config.itemsPerPage]) as User[];
    const meta = { page };

    return new UsersResultSet(data, meta);
  }

  getUser(userId: number) {
    log("getUser");
    const data = this.db.query(`SELECT * FROM Users WHERE Id = ? LIMIT 1`, [userId]) as User[];
    log({ data });
    return new UserResultSet(data[0], {});
  }

  createUser(user: User) {
    log("createUser");
    log({ user });
  }
}
