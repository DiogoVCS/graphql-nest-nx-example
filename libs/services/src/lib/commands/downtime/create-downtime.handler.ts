import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {Downtime, DowntimeTypeEnum, enumFromStringValue} from "@calendar-management-microservice/domain";
import {CreateDowntimeCommand} from "./create-downtime.command";
import {DowntimeOutput, NewDowntimeInput} from "@calendar-management-microservice/dto";
import {BadRequestException} from "@nestjs/common";
import {DowntimeMapper} from "../../mappers/downtime/downtime.mapper";
import {pubSub} from "../../services.module";
import {DowntimeRepository} from "@calendar-management-microservice/infrastructure";


@CommandHandler(CreateDowntimeCommand)
export class CreateDowntimeHandler implements ICommandHandler<CreateDowntimeCommand> {

  constructor(private readonly repository: DowntimeRepository, private readonly publisher: EventPublisher) {
  }

  async execute(command: CreateDowntimeCommand): Promise<DowntimeOutput> {
    console.log(`Async ${this.constructor.name}...`, command.constructor.name);
    const {input} = command;
    input.type = input.type.toUpperCase();
    const downtime: Downtime = this.publisher.mergeObjectContext(
      await this.createNewDowntime(input),
    );
    const output: DowntimeOutput = DowntimeMapper.fromDomain(downtime);
    await pubSub.publish('downtimeCreated', {downtimeCreated: output})

    downtime.createDowntime();
    downtime.commit();
    return output;
  }

  private async createNewDowntime(input: NewDowntimeInput): Promise<Downtime> {

    const translatedEnumValue: DowntimeTypeEnum = enumFromStringValue(DowntimeTypeEnum, input.type);
    if (!translatedEnumValue) {
      throw new BadRequestException("Unknown downtime type!")
    }
    const downtime = DowntimeMapper.toDomain(input);

    await this.repository.create(DowntimeMapper.fromDomain(downtime))
    return downtime;
  }
}
