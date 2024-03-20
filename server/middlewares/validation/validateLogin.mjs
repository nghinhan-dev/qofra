import { checkSchema } from "express-validator";

export const loginValidator = checkSchema({
  username: {
    isString: true,
    isLength: {
      errorMessage: "Username must atleast 5 characters",
      options: {
        min: 5,
      },
    },
  },
  password: {
    isLength: {
      errorMessage: "Username must atleast 6 characters",
      options: {
        min: 6,
      },
    },
  },
});
