import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {DowntimeRepositoryModule} from "./repositories/downtime/downtime.repository.module";
import {DomainModule} from "@calendar-management-microservice/domain";

@Module({
  controllers: [],
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/'),
    DowntimeRepositoryModule,
    DomainModule
  ],
  providers: [],
  exports: [DowntimeRepositoryModule],
})
export class InfrastructureModule {
}
