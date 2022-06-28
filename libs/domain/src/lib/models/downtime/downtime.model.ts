import {AggregateRoot} from "@nestjs/cqrs";
import {DowntimeTypeEnum} from "./downtime-type.enum";
import {Reason} from "./reason.model";
import {Period} from "./period.model";
import {DowntimeCreatedEvent} from "../../events/downtime/downtime-created-event";

export class Downtime extends AggregateRoot {

  private readonly _reason: Reason;
  private readonly _period: Period;
  private readonly _type: DowntimeTypeEnum;

  constructor(type: DowntimeTypeEnum, reason: Reason, period: Period) {
    super();
    this._type = type;
    this._reason = reason;
    this._period = period
  }

  get period(): { startDate: number, endDate: number } {
    return {startDate: this._period.startDate, endDate: this._period.endDate};
  }

  get type(): string {
    return this._type;
  }

  get reason(): string {
    return this._reason.reason
  }

  createDowntime() {
    this.apply(new DowntimeCreatedEvent(this))
  }
}
