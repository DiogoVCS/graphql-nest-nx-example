import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DowntimePeriodOutput {
  @Field(() => Number)
  startDate: number;
  @Field(() => Number)
  endDate: number;
}
