import {DowntimeOutput, NewDowntimeInput} from "@calendar-management-microservice/dto";
import {
  Downtime,
  DowntimeTypeEnum,
  enumFromStringValue,
  Period,
  Reason
} from "@calendar-management-microservice/domain";
import {BadRequestException} from "@nestjs/common";
import {DowntimeEntity} from "@calendar-management-microservice/infrastructure";

export class DowntimeMapper {
  static toDomain(input: NewDowntimeInput | DowntimeEntity): Downtime {
    const type: DowntimeTypeEnum = enumFromStringValue(DowntimeTypeEnum, input.type);

    if (!(<any>Object).values(DowntimeTypeEnum).includes(input.type)) {
      // Do stuff here
      throw new BadRequestException("das")
    }

    return new Downtime(type, new Reason(input.reason), new Period(input.startDate, input.endDate));
  }

  static fromDomain(domain: Downtime): DowntimeOutput | DowntimeEntity {
    const {period: {endDate, startDate}, reason, type} = domain;
    return {reason, type, startDate, endDate}
  }
}
