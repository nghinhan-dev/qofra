import express from "express";
import { login, logout, signUp } from "../controllers/auth.mjs";
import { loginValidator } from "../middlewares/validation/validateLogin.mjs";

export const router = express.Router();

router.use(loginValidator).post("/login", login).get("/logout", logout);

router.post("/signup", signUp);
