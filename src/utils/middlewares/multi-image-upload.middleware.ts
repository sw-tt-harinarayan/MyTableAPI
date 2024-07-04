import * as multer from "multer";
import { Request, Response, NextFunction } from "express";
import {
  Injectable,
  NestMiddleware,
  InternalServerErrorException,
} from "@nestjs/common";

import { COMMON } from "src/lang/en";
import { getImageFolderField } from "../helpers/common-helper";
import { multerOptions, dynamicStorage } from "src/configs/multer.config";

@Injectable()
export default class MultiImageUploadMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { folderName, fieldName } = getImageFolderField(req.originalUrl);

    if (!fieldName || !folderName)
      throw new InternalServerErrorException(COMMON.internalError);

    const upload = multer({
      ...multerOptions,
      storage: dynamicStorage(folderName),
    }).array(fieldName, 10);

    upload(req, res, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(400).json({
          statusCode: 400,
          message: err.message,
        });
      }
      next();
    });
  }
}
