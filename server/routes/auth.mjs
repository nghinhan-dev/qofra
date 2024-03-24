import express from "express";
import { login, logout, signUp, refresh } from "../controllers/auth.mjs";
import { loginValidator } from "../middlewares/validation/validateLogin.mjs";

export const authRoutes = express.Router();

authRoutes.use(loginValidator).post("/login", login).get("/logout", logout);
authRoutes.get("/refresh", refresh);

authRoutes.post("/signup", signUp);
