import * as dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import router from "koa-router";
const app = new Koa();

import { getUsers } from "./services/user.js";

const userRouter = router();

userRouter.get("/users", async (ctx) => {
  const users = await getUsers();
  ctx.body = users;
});

app.use(userRouter.routes());

app.listen(3000);
