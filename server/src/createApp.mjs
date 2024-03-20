import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "../lib/mongoose.mjs";
import { sessionsConfig, corsConfig } from "./config.mjs";
import { useRoutes } from "./useRoutes.mjs";

export async function createApp(httpServer) {
  await connectDB();
  const app = createExpressApp();
  httpServer.on("request", app);

  app.use(cors(corsConfig));
  app.use(sessionsConfig);

  useRoutes(app);

  app.use(handleErrors);
}

function createExpressApp() {
  const app = express();

  app.enable("trust proxy");
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(function (res, req, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  return app;
}

function handleErrors(error, req, res, next) {
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors;
  res.status(status).send({ message: message, errors: errors });
}
