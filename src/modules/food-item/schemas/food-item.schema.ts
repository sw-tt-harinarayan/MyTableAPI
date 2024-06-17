import * as mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { imageFolderField } from "src/configs/constants";
import { Category } from "src/modules/category/schemas/category.schema";

@Schema({ timestamps: true, versionKey: false })
export class FoodItem {
  @Prop({ type: mongoose.Types.ObjectId, ref: "Category", required: true })
  category: Category | string; // Type can be either Category or just string if you don't define a separate interface for Category

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  images: Array<string>;

  @Prop()
  price: number;

  @Prop()
  isAvailable: boolean;

  @Prop()
  isActive: boolean;
}

const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
FoodItemSchema.plugin(mongoosePaginate);

FoodItemSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.id = doc._id;

    return ret;
  },
});

export default FoodItemSchema;
