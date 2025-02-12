export interface Square {
  focus: boolean;
  active: boolean;
  image: string;
  valueExpected: number;
  positionImage: string;
  isBlank: boolean
}

export interface Board {
  dimension: number;
  table: {[key: number]: Square};
}
