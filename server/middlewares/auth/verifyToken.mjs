import jwt from "jsonwebtoken";
import { createError } from "../../utils/createError.mjs";

export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw createError(403, "Forbidden");
      req.user = decoded.user.username;
      req.roles = decoded.user.roles;
      next();
    });
  } catch (error) {
    next(error);
  }
}
