import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import AuthGuard from "../auth/auth.guard";
import RolesGuard from "../auth/roles.guard";
import UserModule from "../user/user.module";
import FoodItemService from "./food-item.service";
import FoodItemSchema from "./schemas/food-item.schema";
import FoodItemController from "./food-item.controller";
import ImageUploadMiddleware from "src/utils/middlewares/image-upload.middleware";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: "FoodItem", schema: FoodItemSchema }]),
  ],
  controllers: [FoodItemController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    FoodItemService,
    ImageUploadMiddleware,
  ],
})
export default class FoodItemModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageUploadMiddleware)
      .forRoutes(
        { path: "food-item/create", method: RequestMethod.POST },
        { path: "food-item/edit/:id", method: RequestMethod.PATCH },
      );
  }
}
