import {DowntimePeriodOutput} from "@calendar-management-microservice/dto";
import {Period} from "@calendar-management-microservice/domain";

export class PeriodMapper {

  static fromDomain(domain: Period): DowntimePeriodOutput {
    return {startDate: domain.startDate, endDate: domain.endDate}
  }
}
