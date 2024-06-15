import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { imageFolderField } from "src/configs/constants";

@Schema({ timestamps: true, versionKey: false })
export class Outlet {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  images: Array<string>;

  @Prop({ default: true })
  isActive: boolean;
}

const OutletSchema = SchemaFactory.createForClass(Outlet);
OutletSchema.plugin(mongoosePaginate);

OutletSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;

    if (ret?.images) {
      let imageUrls = [];

      ret.images.forEach((image: string) => {
        imageUrls.push(
          `${process.env.BASE_URL}/${imageFolderField.outlet.folderName}/${image}`,
        );
      });

      ret.images = imageUrls;
    }

    return ret;
  },
});

export default OutletSchema;
