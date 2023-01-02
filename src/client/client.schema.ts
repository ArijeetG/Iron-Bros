import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IBodyStats,
  IDietChart,
  IWorkoutChart,
  IWorkoutSplit,
} from './client.dto';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class DietChart {
  @Prop()
  meals: string[];
}

@Schema()
export class WorkoutChart {
  @Prop()
  chest: string;

  @Prop()
  back: string;

  @Prop()
  legs: string;

  @Prop()
  calves: string;

  @Prop()
  biceps: string;

  @Prop()
  triceps: string;

  @Prop()
  shoulders: string;

  @Prop()
  abdominals: string;
}

@Schema()
export class WorkoutSplit {
  @Prop()
  day1: string;

  @Prop()
  day2: string;

  @Prop()
  day3: string;

  @Prop()
  day4: string;

  @Prop()
  day5: string;

  @Prop()
  day6: string;

  @Prop()
  day7: string;
}

@Schema()
export class BodyStats {
  @Prop()
  reportsHistoryImageUrls: string[];

  @Prop()
  bpHistory: string[];

  @Prop()
  bodyweightHistory: number[];
}

@Schema()
export class Client {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  doj: number;

  @Prop({
    required: true,
  })
  subExpiry: number;

  @Prop({
    required: true,
  })
  package: string;

  @Prop({
    required: true,
  })
  amountPaid: number;

  @Prop({
    required: true,
  })
  dob: number;

  @Prop({
    required: true,
  })
  phoneNo: number;

  @Prop()
  dietChart: DietChart;

  @Prop()
  workoutChart: WorkoutChart;

  @Prop()
  workoutSplit: WorkoutSplit;

  @Prop()
  bodyStats: BodyStats;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
