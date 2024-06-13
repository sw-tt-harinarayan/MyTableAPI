import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";

import { CATEGORY } from "src/lang/en";
import { Category } from "./schemas/category.schema";
import CreateCategoryDto from "./dto/create-category.dto";
import UpdateCategoryDto from "./dto/update-category.dto";

@Injectable()
export default class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: PaginateModel<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category: Category =
        await this.categoryModel.create(createCategoryDto);

      return { body: category, message: CATEGORY.created };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(options: any) {
    const categorys = await this.categoryModel.paginate({}, options);

    return { body: categorys, message: CATEGORY.found };
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException(CATEGORY.notFound);

    return { body: category, message: CATEGORY.found };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category: Category;

    try {
      category = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!category) throw new NotFoundException(CATEGORY.notFound);

    return { body: category, message: CATEGORY.updated };
  }

  async remove(id: string) {
    let category: Category;

    try {
      category = await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!category) throw new NotFoundException(CATEGORY.notFound);

    return { body: category, message: CATEGORY.deleted };
  }
}
