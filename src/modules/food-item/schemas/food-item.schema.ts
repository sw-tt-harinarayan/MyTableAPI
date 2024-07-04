import * as mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { imageFolderField } from "src/configs/constants";
import { Category } from "src/modules/category/schemas/category.schema";

@Schema({ timestamps: true, versionKey: false })
export class FoodItem {
  @Prop({ type: mongoose.Types.ObjectId, ref: "Category", required: true })
  category: Category;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  images: Array<string>;

  @Prop()
  price: number;

  @Prop()
  isActive: boolean;
}

const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
FoodItemSchema.plugin(mongoosePaginate);

FoodItemSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;

    if (ret?.images.length > 0) {
      ret.images = ret.images.map((image: string) => {
        return `${process.env.BASE_URL}/${imageFolderField.foodItem.folderName}/${image}`;
      });
    }

    return ret;
  },
});

export default FoodItemSchema;
