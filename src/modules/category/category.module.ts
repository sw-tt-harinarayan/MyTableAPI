import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import AuthGuard from "../auth/auth.guard";
import RolesGuard from "../auth/roles.guard";
import UserModule from "../user/user.module";
import CategoryService from "./category.service";
import CategorySchema from "./schemas/category.schema";
import CategoryController from "./category.controller";
import ImageUploadMiddleware from "src/utils/middlewares/image-upload.middleware";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CategoryService,
    ImageUploadMiddleware,
  ],
})
export default class CategoryModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(ImageUploadMiddleware)
  //     .forRoutes(
  //       { path: "category/create", method: RequestMethod.POST },
  //       { path: "category/edit/:id", method: RequestMethod.PATCH },
  //     );
  // }
}
