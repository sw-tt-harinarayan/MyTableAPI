import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role, Status } from 'src/common/enums';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  image: string;

  @Prop()
  role: Role;

  @Prop()
  status: Status;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;
    ret.image = `${process.env.BASE_URL}${ret.image}`;

    return ret;
  },
});

export default UserSchema;
