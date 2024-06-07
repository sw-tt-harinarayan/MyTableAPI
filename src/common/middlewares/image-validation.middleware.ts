import * as multer from "multer";
import { Request, Response, NextFunction } from "express";
import { NestMiddleware, Injectable } from "@nestjs/common";

import { multerOptions, dynamicStorage } from "src/configs/multer.config";

@Injectable()
export class ImageValidationMiddleware implements NestMiddleware {
  private upload = multer({
    ...multerOptions,
    storage: dynamicStorage("user"),
  }).single("image");

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({
          statusCode: 400,
          message: err.message,
        });
      }
      next();
    });
  }
}
