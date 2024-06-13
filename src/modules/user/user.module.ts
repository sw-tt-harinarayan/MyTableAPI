import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import UserService from "./user.service";
import UserSchema from "./schemas/user.schema";
import UserController from "./user.controller";
import ImageUploadMiddleware from "src/utils/middlewares/image-upload.middleware";

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, ImageUploadMiddleware],
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
})
export default class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageUploadMiddleware)
      .forRoutes(
        { path: "user/create", method: RequestMethod.POST },
        { path: "user/edit/:id", method: RequestMethod.PATCH },
      );
  }
}
