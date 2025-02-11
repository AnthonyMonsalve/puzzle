export interface Square {
  focus: boolean;
  active: boolean;
  image: string;
  valueExpected: number;
}

export interface Board {
  dimension: number;
  table: {[key: number]: Square};
}
