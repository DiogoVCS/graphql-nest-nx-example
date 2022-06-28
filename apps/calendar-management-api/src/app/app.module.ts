import {Module} from '@nestjs/common';

import {GraphQLModule, registerEnumType} from "@nestjs/graphql";
import {DowntimeResolver} from "./resolvers/downtime/downtime.resolver";
import {ServicesModule} from "@calendar-management-microservice/services";
import {DtoModule} from "@calendar-management-microservice/dto";
import {CqrsModule} from "@nestjs/cqrs";
import {DowntimeTypeEnum} from "@calendar-management-microservice/domain";

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: true,
    installSubscriptionHandlers: true,
    subscriptions: {
      'graphql-ws': true
    },
  }),
    CqrsModule,
    ServicesModule,
    DtoModule,
  ],
  providers: [DowntimeResolver],
})
export class AppModule {
}

registerEnumType(DowntimeTypeEnum, {
  name: 'DowntimeType',
});
