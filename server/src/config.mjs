import session from "express-session";
import mongoDBStore from "connect-mongo";

export const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

export const sessionsConfig = session({
  secret: "fnn1o3ujf02958w94glkdjsfjr90239r",
  resave: false,
  saveUninitialized: false,
  store: mongoDBStore.create({
    mongoUrl: process.env.DB_KEY,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 86400000,
    sameSite: "none",
    httpOnly: true,
  },
});
