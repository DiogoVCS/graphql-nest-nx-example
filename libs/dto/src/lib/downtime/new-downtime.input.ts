import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class NewDowntimeInput {
  @Field({nullable: false})
  type: string;

  @Field({nullable: false})
  reason: string;

  @Field({nullable: false})
  startDate: number;

  @Field({nullable: false})
  endDate: number;
}
