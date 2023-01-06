console.log("\u2705 Started");
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import debug from "debug";
const log: debug.IDebugger = debug(`app:${path.parse(__filename).name}`);

const app = express();
app.use(morgan("tiny")); // Logging

console.log(__dirname);

app.use(express.json()); // Access req.body
app.use(express.static(path.join(__dirname, "public"))); // Static content in public (served from /)
app.use(cors()); // Middleware to allow cross-origin requests

app.get("/ping", function (req, res) {
  res.send("pong");
});

import { BaseRoutesConfig } from "./routes/base.routes.config";
import { UsersRoutes } from "./routes/users.routes.config";
import { ProductsRoutes } from "./routes/products.routes.config";

const routes: Array<BaseRoutesConfig> = [];
routes.push(new UsersRoutes(app));
routes.push(new ProductsRoutes(app));

const port = 3000;
app.listen(port, () => {
  routes.forEach((route: BaseRoutesConfig) => {
    log(`Routes configured for ${route.getName()}`);
  });

  console.log(`\u2705 Server listening on port ${port}`);
});
