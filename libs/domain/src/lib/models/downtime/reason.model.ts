import {BadRequestException} from "@nestjs/common";

export class Reason {

  private readonly _reason: string;

  constructor(reason: string) {
    if (!reason || reason === '') {
      throw new BadRequestException("Reason cannot be empty")
    }
    this._reason = reason;
  }

  get reason(): string {
    return this._reason;
  }
}
