import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DowntimeDocument, DowntimeEntity} from "./downtime.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DowntimeRepository {

  constructor(@InjectModel(DowntimeEntity.name) private readonly downtimeModel: Model<DowntimeDocument>) {
  }

  async create(downtime: DowntimeEntity): Promise<DowntimeEntity> {
    const createdDowntime = new this.downtimeModel(downtime);
    return createdDowntime.save();
  }

  async findAll(): Promise<DowntimeEntity[]> {
    return this.downtimeModel.find().exec();
  }

  async findAllByType(type: string): Promise<DowntimeEntity[]> {
    return this.downtimeModel.find({"type": type})
  }

}
