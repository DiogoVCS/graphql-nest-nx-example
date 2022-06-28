import {BadRequestException} from "@nestjs/common";

export class Period {
  private readonly _endDate: number;
  private readonly _startDate: number;

  constructor(startDate: number, endDate: number) {
    if (startDate >= endDate) {
      throw new BadRequestException("Start date cannot be less or equal to end date.")
    }

    this._startDate = startDate;
    this._endDate = endDate;
  }

  get endDate(): number {
    return this._endDate;
  }

  get startDate(): number {
    return this._startDate;
  }

  static mergeOverlappingPeriods(periods: Period[]): Period[] {
    const sorted = this.sortPeriods(periods)

    return sorted.reduce((acc: Period[], curr: Period) => {
      // Skip the first range
      if (acc.length === 0) {
        return [curr];
      }

      const prev = acc.pop();

      if (curr.endDate <= prev.endDate) {
        // Current range is completely inside previous
        return [...acc, prev];
      }

      // Merges overlapping (<) and contiguous (==) ranges
      if (curr.startDate <= prev.endDate) {
        // Current range overlaps previous
        return [...acc, (new Period(prev.startDate, curr.endDate))];
      }

      // Ranges do not overlap
      return [...acc, prev, curr];
    }, [] as Period[]);
  }

  private static sortPeriods(periods: Period[]): Period[] {
    return periods.sort((a: Period, b: Period) => a.startDate - b.startDate,);
  }
}
