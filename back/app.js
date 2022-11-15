import * as dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import router from "koa-router";
import cors from '@koa/cors'
const app = new Koa();

import { getUsers } from "./services/user.js";

const userRouter = router();

userRouter.get("/users", async (ctx) => {
  const users = await getUsers();
  ctx.body = users;
});

app.use(cors());
app.use(userRouter.routes()).use(userRouter.allowedMethods());;


app.listen(3000);
