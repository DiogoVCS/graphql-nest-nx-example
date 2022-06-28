import {ICommand} from "@nestjs/cqrs";

export class DowntimeCreatedSubscriptionCommand implements ICommand {
  constructor(public readonly type: string) {
  }
}
