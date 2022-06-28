import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {DowntimeEntity, DowntimeSchema} from "./downtime.entity";
import {DowntimeRepository} from "./downtime.repository";


@Module({
  imports: [MongooseModule.forFeature([{name: DowntimeEntity.name, schema: DowntimeSchema}])],
  providers: [DowntimeRepository],
  exports: [DowntimeRepository],
})
export class DowntimeRepositoryModule {
}
