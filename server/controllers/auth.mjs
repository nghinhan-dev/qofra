import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import { validateHandler } from "../lib/validateHandler.mjs";
import { hashPassword, comparePassword } from "../lib/bcrypt.mjs";
import { createError } from "../utils/createError.mjs";

export async function login(req, res, next) {
  try {
    // VALIDATE REQ.BODY
    const bodyError = await validateHandler(req);
    if (bodyError) {
      throw bodyError;
    }

    const { username, password } = req.body;

    // CHECK USERNAME
    const user = await User.findOne({ username: username });

    if (user.length === 0) {
      throw createError(404, `User with username ${username} not found`);
    }

    // CHECK PASSWORD
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw createError(401, "Login Failed. Password mismatch");
    }

    // CREATE JWT TOKEN
    const accessToken = jwt.sign(
      {
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({
      message: "Success",
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function signUp(req, res, next) {
  try {
    // VALIDATE REQ.BODY
    const bodyError = await validateHandler(req);
    if (bodyError) {
      throw bodyError;
    }

    const { username, password, fullName, email, role } = req.body;

    // CHECK EXISTED ACCOUNT
    const user = await User.findOne({ email: email });

    if (user) {
      throw createError(409, "Existed email, please use a different email");
    }

    // CREATE USER
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      email: email,
      role: role,
    });

    // VALIDATE new USER
    const schemaError = newUser.validateSync();
    if (schemaError?._message) {
      throw createError(422, schemaError.message);
    }

    await newUser.save();
    res.status(200).send({ message: "Success", user: newUser });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(200).send({ message: "Login successfull" });
}

export async function refresh(req, res, next) {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) throw createError(401, "Unauthorized");

    const refreshToken = cookies.jwt;

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) throw createError(403, "Forbidden");

        return decoded;
      }
    );

    const foundUser = await User.findOne({ username: decoded.username }).exec();
    if (!foundUser) throw createError(401, "Unauthorized");

    const accessToken = jwt.sign(
      {
        user: {
          username: foundUser.username,
          fullName: foundUser.fullName,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.send({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
}
