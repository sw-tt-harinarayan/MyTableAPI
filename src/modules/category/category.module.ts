import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import CategoryService from "./category.service";
import CategorySchema from "./schemas/category.schema";
import CategoryController from "./category.controller";
import ImageUploadMiddleware from "src/common/middlewares/image-upload.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ImageUploadMiddleware],
})
export default class CategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageUploadMiddleware)
      .forRoutes(
        { path: "category/edit/:id", method: RequestMethod.PATCH },
        { path: "category/create", method: RequestMethod.POST },
      );
  }
}
