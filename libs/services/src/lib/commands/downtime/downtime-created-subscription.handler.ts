import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DowntimeCreatedSubscriptionCommand} from "./downtime-created-subscription.command";
import {pubSub} from "../../services.module"

@CommandHandler(DowntimeCreatedSubscriptionCommand)
export class DowntimeCreatedSubscriptionHandler implements ICommandHandler<DowntimeCreatedSubscriptionCommand> {

  async execute(command: DowntimeCreatedSubscriptionCommand): Promise<AsyncIterator<unknown>> {
    return pubSub.asyncIterator('downtimeCreated');
  }
}
