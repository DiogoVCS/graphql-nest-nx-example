import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {Downtime} from "@calendar-management-microservice/domain";
import {DowntimeOutput, DowntimePeriodOutput, NewDowntimeInput} from "@calendar-management-microservice/dto";
import {
  CreateDowntimeCommand,
  DowntimeCreatedSubscriptionCommand,
  GetDowntimePeriodsQuery
} from "@calendar-management-microservice/services";
import {CommandBus, QueryBus} from "@nestjs/cqrs";


@Resolver(() => Downtime)
export class DowntimeResolver {

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  @Query(() => [DowntimePeriodOutput])
  async downTimePeriods(@Args('type', {nullable: true}) type: string, @Args('date', {nullable: true}) date: number) {
    return this.queryBus.execute(new GetDowntimePeriodsQuery(type, date))
  }

  @Mutation(() => DowntimeOutput)
  async createNewDowntime(@Args('input') input: NewDowntimeInput): Promise<DowntimeOutput> {
    return this.commandBus.execute(new CreateDowntimeCommand(input));
  }

  @Subscription(() => DowntimeOutput, {
    filter: (payload, variables) =>
      payload.downtimeCreated.type.toUpperCase() === variables.type.toUpperCase(),
  })
  downtimeCreated(@Args('type') type: string) {
    return this.commandBus.execute(new DowntimeCreatedSubscriptionCommand(type))
  }
}
