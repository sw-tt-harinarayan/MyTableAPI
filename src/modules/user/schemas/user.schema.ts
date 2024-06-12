import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Role, Status } from "src/configs/enums";
import Address from "src/common/schemas/address.schema";
import { imageFolderField } from "src/configs/constants";

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileImage: string;

  @Prop()
  role: Role;

  @Prop()
  address: Address;

  @Prop()
  status: Status;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;

    if (ret?.profileImage)
      ret.profileImage = `${process.env.BASE_URL}/${imageFolderField.user.folderName}/${ret.profileImage}`;

    return ret;
  },
});

export default UserSchema;
