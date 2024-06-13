import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Role, Status } from "src/configs/enums";
import { imageFolderField } from "src/configs/constants";

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  id: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileImage: string;

  @Prop({ set: setRoles })
  roles: Role[];

  @Prop()
  token: string;

  @Prop()
  address: string;

  @Prop()
  status: Status;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.createdAt;

    ret.id = doc._id.toString();

    if (ret?.profileImage)
      ret.profileImage = `${process.env.BASE_URL}/${imageFolderField.user.folderName}/${ret.profileImage}`;

    return ret;
  },
});

function setRoles(roles: string) {
  return roles.split(",");
}

export default UserSchema;
