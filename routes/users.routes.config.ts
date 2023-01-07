import { BaseRoutesConfig } from "./base.routes.config";
import { createUser, createUserSchema, getUser, getManyUsers } from "../controllers/users.controller";
import { check, validationResult } from "express-validator";
import express from "express";

export class UsersRoutes extends BaseRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }
  configureRoutes() {
    this.app
      .route(`/users`)
      .get((req: express.Request, res: express.Response) => {
        getManyUsers(req, res);
      })
      .post(createUserSchema, (req: express.Request, res: express.Response) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
          res.status(422).json({ error: error.array() });
        } else {
          createUser(req, res);
        }
      });

    this.app
      .route(`/users/:userId`)
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this middleware function runs before any request to /users/:userId
        // but it doesn't accomplish anything just yet---
        // it simply passes control to the next applicable function below using next()
        next();
      })
      .get(check("userId", "Invalid userId").isInt({ min: 0 }), (req: express.Request, res: express.Response) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
          res.status(422).json({ error: error.array() });
        } else {
          getUser(req, res);
        }
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });

    return this.app;
  }
}
