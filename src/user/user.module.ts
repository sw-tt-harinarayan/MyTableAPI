import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserService } from './user.service';
import UserSchema from './schemas/user.schema';
import { UserController } from './user.controller';
import { ImageValidationMiddleware } from 'src/common/middlewares/image-validation.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ImageValidationMiddleware).forRoutes('user/create');
  }
}
