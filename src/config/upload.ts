import multer, { StorageEngine } from "multer";
import { resolve } from "node:path";
import crypto from "node:crypto";

export function uploadConfig(folder: string): { storage: StorageEngine } {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", folder),
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  };
}
