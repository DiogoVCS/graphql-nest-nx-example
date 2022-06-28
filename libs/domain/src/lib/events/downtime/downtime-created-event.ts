import {IEvent} from "@nestjs/cqrs";
import {Downtime} from "../../models/downtime/downtime.model";

export class DowntimeCreatedEvent implements IEvent {
  constructor(public readonly downtime: Downtime) {
  }
}
