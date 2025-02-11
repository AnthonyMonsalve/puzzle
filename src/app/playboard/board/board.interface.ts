export interface Square {
  value: number;
  focus: boolean;
  active: boolean;
  image: string;
  valueExpected: number;
}

export interface Board {
  dimension: number;
  table: {[key: number]: Square};
}
