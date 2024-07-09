import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { OutletModule } from "./modules/outlet/outlet.module";

import AppService from "./app.service";
import AppController from "./app.controller";
import UserModule from "./modules/user/user.module";
import AuthModule from "./modules/auth/auth.module";
import CloudinaryService from "./cloudinary.service";
import CategoryModule from "./modules/category/category.module";
import FoodItemModule from "./modules/food-item/food-item.module";
import HttpExceptionFilter from "./utils/filters/http-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MulterModule.register({ dest: "./uploads" }),
    // MongooseModule.forRoot(process.env.DB_URI, {
    //   connectionFactory: (connection) => {
    //     connection.plugin(require("mongoose-autopopulate"));
    //     return connection;
    //   },
    // }),
    UserModule,
    AuthModule,
    OutletModule,
    CategoryModule,
    FoodItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
