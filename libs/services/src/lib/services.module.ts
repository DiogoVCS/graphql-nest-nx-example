import {Module} from '@nestjs/common';
import {DtoModule} from "@calendar-management-microservice/dto";
import {CqrsModule} from "@nestjs/cqrs";
import {DomainModule} from "@calendar-management-microservice/domain";
import {CreateDowntimeCommand} from "./commands/downtime/create-downtime.command";
import {CreateDowntimeHandler} from "./commands/downtime/create-downtime.handler";
import {DowntimeCreatedSubscriptionHandler} from "./commands/downtime/downtime-created-subscription.handler";
import {DowntimeCreatedSubscriptionCommand} from "./commands/downtime/downtime-created-subscription.command";
import {PubSub} from "graphql-subscriptions";
import {InfrastructureModule} from "@calendar-management-microservice/infrastructure";
import {GetDowntimePeriodsHandler} from "./queries/downtime/get-downtime-periods.handler";
import {GetDowntimePeriodsQuery} from "./queries/downtime/get-downtime-periods.query";

export const CommandHandlers = [CreateDowntimeHandler, DowntimeCreatedSubscriptionHandler];
export const Commands = [CreateDowntimeCommand, DowntimeCreatedSubscriptionCommand];
export const QueriesHandlers = [GetDowntimePeriodsHandler];
export const Queries = [GetDowntimePeriodsQuery];
export const EventHandlers = [];
export const Sagas = [];
export const pubSub = new PubSub();

@Module({
  imports: [
    CqrsModule,
    DomainModule,
    DtoModule,
    InfrastructureModule
  ],
  providers: [
    ...Commands,
    ...CommandHandlers,
    ...Sagas,
    ...EventHandlers,
    ...Queries,
    ...QueriesHandlers
  ],
  exports: [...Commands, ...Queries],
})
export class ServicesModule {
}
