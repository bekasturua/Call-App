import * as dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import router from "koa-router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
const app = new Koa();

import { getUsers, addUser, deleteUser } from "./services/user.js";

const userRouter = router();

userRouter.get("/users", async (ctx) => {
  const users = await getUsers();
  ctx.body = users;
});

userRouter.post("/users", async (ctx) => {
  const user = await addUser(ctx.request.body);
  ctx.body = user;
});

userRouter.delete("/users/:id", async (ctx) => {
  await deleteUser(ctx.params.id);
  ctx.body = "success";
});

app.use(cors());
app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.listen(3000);
