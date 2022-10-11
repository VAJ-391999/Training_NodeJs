import express from "express";
import { config } from "./utils/config";
import bodyParser from "body-parser";
import registrationRouter from "./registration/router/registration.router";
import loginRouter from "./login/router/login.router";
import userRouter from "./user/router/user.router";
import { mongoDBConnection } from "./db/mongodb/connection";
import {redisConnection } from './db/redis/connection'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/registration", registrationRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

app.listen(config.port, async () => {
  console.log(`server is running on port ${config.port}`);
  await mongoDBConnection()
    .then()
    .catch((error) => {
      throw error;
    });
  redisConnection()
});
