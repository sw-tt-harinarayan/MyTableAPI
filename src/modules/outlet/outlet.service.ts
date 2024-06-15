import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";

import { OUTLET } from "src/lang/en";
import { Outlet } from "./schemas/outlet.schema";
import OutletOutletDto from "./dto/create-outlet.dto";
import UpdateOutletDto from "./dto/update-outlet.dto";

@Injectable()
export default class OutletService {
  constructor(
    @InjectModel(Outlet.name) private outletModel: PaginateModel<Outlet>,
  ) {}

  async create(createOutletDto: OutletOutletDto) {
    try {
      const outlet: Outlet = await this.outletModel.create(createOutletDto);

      return { body: outlet, message: OUTLET.created };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const outlets = await this.outletModel.paginate();

    return { body: outlets, message: OUTLET.found };
  }

  async findOne(id: string) {
    const outlet = await this.outletModel.findById(id);

    if (!outlet) throw new NotFoundException(OUTLET.notFound);

    return { body: outlet, message: OUTLET.found };
  }

  async update(id: string, updateOutletDto: UpdateOutletDto) {
    let outlet: Outlet;

    try {
      outlet = await this.outletModel.findByIdAndUpdate(id, updateOutletDto, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!outlet) throw new NotFoundException(OUTLET.notFound);

    return { body: outlet, message: OUTLET.updated };
  }

  async remove(id: string) {
    let outlet: Outlet;

    try {
      outlet = await this.outletModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!outlet) throw new NotFoundException(OUTLET.notFound);

    return { body: outlet, message: OUTLET.deleted };
  }
}
