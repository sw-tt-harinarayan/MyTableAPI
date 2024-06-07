import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import * as fileUpload from "express-fileupload";
import { MongooseModule } from "@nestjs/mongoose";

import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    // fileUpload({}),
    UserModule,
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
