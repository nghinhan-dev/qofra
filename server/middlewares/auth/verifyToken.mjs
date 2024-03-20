import jwt from "jsonwebtoken";
import { createError } from "../../utils/createError.mjs";

export async function verifyToken(req, res, next) {
  try {
    const cookie = req.cookie;

    // CHECK COOKIE
    if (!cookie?.jwt) throw createError(401, "Unauthorized");
    const refreshToken = cookie.jwt;

    // VERIFY
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log(decodedToken);
    next();
  } catch (error) {
    next(error);
  }
}
