import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DowntimeOutput {
  // @Directive('@external')
  // @Field(() => ID)
  // id: string;
  @Field(() => String)
  type: string;
  @Field(() => String)
  reason: string;
  @Field(() => Number)
  startDate: number;
  @Field(() => Number)
  endDate: number;
}
