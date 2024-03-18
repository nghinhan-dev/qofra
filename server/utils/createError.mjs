export function createError(statusCode, message) {
  return {
    statusCode: statusCode,
    message: message,
  };
}
