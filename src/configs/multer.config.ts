import * as fs from "fs";
import { diskStorage } from "multer";

export const multerOptions = {
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(
        new Error("Only jpg or png image files are allowed!"),
        false,
      );
    }
    callback(null, true);
  },

  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
};

export const dynamicStorage = (folderName: string) => {
  const folderPath = `./uploads/${folderName}/`;

  return diskStorage({
    destination: (req, file, cb) => {
      // Check if the folder exists, if not, create it
      if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

      cb(null, folderPath); // Set the dynamic destination folder
    },

    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(
        null,
        `${parseInt(Date.now().toString()) + Math.floor(100000000 + Math.random() * 900000000)}.${ext}`,
      );
    },
  });
};
