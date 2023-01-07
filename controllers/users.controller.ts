import express from "express";
import debug from "debug";
import path from "path";

import UserService, { UserResultSet, UsersResultSet } from "../services/users.service";

import { getExceptionString } from "../helpers";
import { check } from "express-validator/check";
import { User } from "../models/user.model";

const log: debug.IDebugger = debug(`app:${path.parse(__filename).name}`);

export const getManyUsers = (req: express.Request, res: express.Response) => {
  log("getManyUsers");
  try {
    const page: number = Number(req.params.page) || 0;
    const userService = new UserService();
    const users: UsersResultSet = userService.getManyUsers(page);
    res.json(users);
  } catch (e: unknown) {
    console.log(getExceptionString(e));
  }
  return undefined;
};

export const getUser = (req: express.Request, res: express.Response) => {
  log("getUser");
  try {
    const userService = new UserService();
    const user: UserResultSet = userService.getUser(Number(req.params.userId));
    res.json(user);
  } catch (e: unknown) {
    console.log(getExceptionString(e));
  }
  return undefined;
};

export const createUser = async (req: express.Request, res: express.Response) => {
  log("createUser");
  const user = Object.assign(new User(), req.body);
  log({ user });
  const userService = new UserService();
  await userService.createUser(user);
  res.json(user);
};

export const createUserSchema = [
  check("Username", "Missing username.").exists(),
  // body("Name", "Missing name.").exists(),
  // body("Password", "Missing password").exists(),
  // body("Salt", "Missing salt.").exists(),
  // body("Email", "Missing email.").exists(),
  // body(["Username", "Name", "Password", "Salt", "Email", "Role"], "Missing field.").exists(),
  // body("Email", "Not valid email.").isEmail(),
  // // body("Role", "Role doesn't exist").exists(),
  // body("Role", "Unknown role").isIn(["Admin", "User"]),
];
