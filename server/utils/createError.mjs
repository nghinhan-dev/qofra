export function createError(statusCode, message) {
  const newError = new Error(message);
  newError.statusCode = statusCode;

  return newError;
}
