import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { imageFolderField } from "src/configs/constants";

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  isActive: boolean;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.plugin(mongoosePaginate);

CategorySchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;

    if (ret?.image)
      ret.image = `${process.env.BASE_URL}/${imageFolderField.category.folderName}/${ret.image}`;

    return ret;
  },
});

export default CategorySchema;
