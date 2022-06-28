import {EventPublisher, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetDowntimePeriodsQuery} from "./get-downtime-periods.query";
import {DowntimeEntity, DowntimeRepository} from "@calendar-management-microservice/infrastructure";
import {DowntimePeriodOutput} from "@calendar-management-microservice/dto";
import {Downtime, DowntimeTypeEnum, enumFromStringValue, Period} from "@calendar-management-microservice/domain";
import {DowntimeMapper} from "../../mappers/downtime/downtime.mapper";
import {PeriodMapper} from "../../mappers/downtime/period.mapper";

@QueryHandler(GetDowntimePeriodsQuery)
export class GetDowntimePeriodsHandler implements IQueryHandler<GetDowntimePeriodsQuery> {

  constructor(private readonly repository: DowntimeRepository, private readonly publisher: EventPublisher) {

  }

  async execute(query: GetDowntimePeriodsQuery): Promise<DowntimePeriodOutput[]> {
    let entities: DowntimeEntity[];

    if (query.type) {
      const type = query.type.toUpperCase();
      if (type && enumFromStringValue(DowntimeTypeEnum, type)) {
        entities = await this.repository.findAllByType(type);
      }
    } else {
      entities = await this.repository.findAll();
    }

    if (query.date) {
      entities = entities?.filter(e => e.startDate <= query.date && e.endDate >= query.date) || [];
    }

    const downtimes: Downtime[] = entities.map(m => DowntimeMapper.toDomain(m))
    return Period.mergeOverlappingPeriods(downtimes.map(n => n.period as Period)).map(m => PeriodMapper.fromDomain(m))
  }
}
