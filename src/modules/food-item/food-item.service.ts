import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

import { FOOD_ITEM } from "src/lang/en";
import { FoodItem } from "./schemas/food-item.schema";
import CreateFoodItemDto from "./dto/create-food-item.dto";
import UpdateFoodItemDto from "./dto/update-food-item.dto";

@Injectable()
export default class FoodItemService {
  constructor(
    @InjectModel(FoodItem.name) private foodItemModel: PaginateModel<FoodItem>,
  ) {}

  async create(createFoodItemDto: CreateFoodItemDto) {
    let foodItem: FoodItem = await this.foodItemModel.findOne({
      name: createFoodItemDto.name,
    });

    if (foodItem) throw new BadRequestException("Food Item already exist");

    try {
      const foodItem: FoodItem =
        await this.foodItemModel.create(createFoodItemDto);

      return { body: foodItem, message: FOOD_ITEM.created };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const foodItems = await this.foodItemModel.paginate(
      {},
      {
        strictPopulate: false,
        populate: [
          {
            path: "category",
            select: "name",
          },
        ],
      },
    );

    return { body: foodItems, message: FOOD_ITEM.found };
  }

  async findOne(id: string) {
    const foodItem = await this.foodItemModel.findById(id);

    if (!foodItem) throw new NotFoundException(FOOD_ITEM.notFound);

    return { body: foodItem, message: FOOD_ITEM.found };
  }

  async update(id: string, updateFoodItemDto: UpdateFoodItemDto) {
    let foodItem: FoodItem;

    try {
      foodItem = await this.foodItemModel.findByIdAndUpdate(
        id,
        updateFoodItemDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!foodItem) throw new NotFoundException(FOOD_ITEM.notFound);

    return { body: foodItem, message: FOOD_ITEM.updated };
  }

  async remove(id: string) {
    let foodItem: FoodItem;

    try {
      foodItem = await this.foodItemModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!foodItem) throw new NotFoundException(FOOD_ITEM.notFound);

    return { body: foodItem, message: FOOD_ITEM.deleted };
  }
}
