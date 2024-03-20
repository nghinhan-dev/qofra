import { validationResult } from "express-validator";

export async function validateHandler(req) {
  const result = validationResult(req).array();

  if (result.length === 0) return;

  const error = new Error("Invalid fields");
  error.statusCode = 400;
  error.errors = result;

  return error;
}
