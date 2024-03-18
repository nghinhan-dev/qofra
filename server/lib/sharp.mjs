import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function uploadImg(file) {
  console.log("file:", file);
  // Extract the file name from the file object
  const fileName = uuidv4();

  // Resize and save the image using sharp
  await sharp(file.buffer)
    .resize({ width: 250, height: 150 })
    .toFile(`/dev web/qofra/server/data/images/${fileName}.jpg`);
}
