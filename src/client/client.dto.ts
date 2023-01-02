export interface IClient {
  dietChart?: IDietChart;
  workoutChart?: IWorkoutChart;
  workoutSplit?: IWorkoutSplit;
  bodyStats?: IBodyStats;
  name: string;
  doj: number;
  subExpiry: number;
  package: string;
  amountPaid: number;
  dob: number;
  phoneNo: number;
}

export interface IDietChart {
  meals: string[];
}

export interface IWorkoutChart {
  chest?: string[];
  back?: string[];
  legs?: string[];
  calves?: string[];
  biceps?: string[];
  triceps?: string[];
  shoulders?: string[];
  abdominals?: string[];
}

export interface IWorkoutSplit {
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
}

export interface IBodyStats {
  reportsHistoryImageUrls?: string[];
  bpHistory?: string[];
  bodyweightHistory?: number[];
}
