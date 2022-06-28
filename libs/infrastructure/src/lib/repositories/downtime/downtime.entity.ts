import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type DowntimeDocument = DowntimeEntity & Document;

@Schema()
export class DowntimeEntity {
  @Prop()
  type: string;
  @Prop()
  reason: string;
  @Prop()
  startDate: number;
  @Prop()
  endDate: number;
}

export const DowntimeSchema = SchemaFactory.createForClass(DowntimeEntity);
