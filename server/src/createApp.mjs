import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { useRoutes } from "./useRoutes.mjs";
import { connectDB } from "../lib/mongoose.mjs";

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

export async function createApp(httpServer) {
  await connectDB();
  const app = createExpressApp();
  httpServer.on("request", app);

  app.use(helmet());
  app.use(cors(corsConfig));

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
