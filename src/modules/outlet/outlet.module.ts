import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import AuthGuard from "../auth/auth.guard";
import OutletService from "./outlet.service";
import RolesGuard from "../auth/roles.guard";
import UserModule from "../user/user.module";
import OutletController from "./outlet.controller";
import OutletSchema from "./schemas/outlet.schema";
import MultiImageUploadMiddleware from "src/utils/middlewares/multi-image-upload.middleware";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: "Outlet", schema: OutletSchema }]),
  ],
  controllers: [OutletController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    OutletService,
    MultiImageUploadMiddleware,
  ],
})
export class OutletModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MultiImageUploadMiddleware)
      .forRoutes(
        { path: "outlet/create", method: RequestMethod.POST },
        { path: "outlet/edit/:id", method: RequestMethod.PATCH },
      );
  }
}
