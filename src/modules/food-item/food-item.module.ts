import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import AuthGuard from "../auth/auth.guard";
import RolesGuard from "../auth/roles.guard";
import UserModule from "../user/user.module";
import FoodItemService from "./food-item.service";
import FoodItemController from "./food-item.controller";
import FoodItemSchema, { FoodItem } from "./schemas/food-item.schema";
// import MultiImageUploadMiddleware from "src/utils/middlewares/multi-image-upload.middleware";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: FoodItem.name, schema: FoodItemSchema },
    ]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: FoodItem.name,
    //     useFactory: () => {
    //       const schema = FoodItemSchema;
    //       schema.plugin(require("mongoose-autopopulate"));
    //       return schema;
    //     },
    //   },
    // ]),
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
    // MultiImageUploadMiddleware,
  ],
})
export default class FoodItemModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(MultiImageUploadMiddleware)
  //     .forRoutes(
  //       { path: "food-item/create", method: RequestMethod.POST },
  //       { path: "food-item/edit/:id", method: RequestMethod.PATCH },
  //     );
  // }
}
