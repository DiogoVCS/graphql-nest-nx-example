import {IQuery} from "@nestjs/cqrs";

export class GetDowntimePeriodsQuery implements IQuery {
  constructor(public readonly type?: string, public readonly date?: number) {
  }
}
