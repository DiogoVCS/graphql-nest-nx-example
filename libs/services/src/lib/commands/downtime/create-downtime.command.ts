import {ICommand} from "@nestjs/cqrs";
import {NewDowntimeInput} from "@calendar-management-microservice/dto";

export class CreateDowntimeCommand implements ICommand {
  constructor(public readonly input: NewDowntimeInput) {
  }
}
