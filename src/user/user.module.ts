import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import UserService from "./user.service";
import UserSchema from "./schemas/user.schema";
import UserController from "./user.controller";
import ImageUploadMiddleware from "src/common/middlewares/image-upload.middleware";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, ImageUploadMiddleware],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageUploadMiddleware)
      .forRoutes(
        { path: "user/edit", method: RequestMethod.PATCH },
        { path: "user/create", method: RequestMethod.POST },
      );
  }
}
