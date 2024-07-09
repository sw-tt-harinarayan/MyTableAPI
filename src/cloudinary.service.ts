import { Injectable } from "@nestjs/common";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

@Injectable()
export default class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: "doqaijxs1",
      api_key: "518246518862545",
      api_secret: "95hrKrkUWr_V0vnF2-JGEYp0CYU", // Click 'View Credentials' below to copy your API secret
    });
  }

  async uploadImage(file: any, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "auto",
          },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) return reject(error.message);

            resolve(result.url);
          },
        )
        .end(file.buffer);
    });
  }
}
