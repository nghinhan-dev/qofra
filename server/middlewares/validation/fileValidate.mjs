import { createError } from "../../utils/createError.mjs";

export async function fileValidate(type, req, res, next) {
  try {
    const files = req.files;

    if (files.length === 0 || !files) throw createError(400, "Empty images");
    // if (files.length === 0 || !files) next();

    files.map((file) => {
      if (file.mimetype !== type) {
        throw createError(400, "Only receive jpg files");
      }
    });

    next();
  } catch (error) {
    next(error);
  }
}
