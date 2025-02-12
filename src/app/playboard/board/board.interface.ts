export interface Square {
  focus: boolean;
  active: boolean;
  valueExpected: number;
  positionImage: string;
  isBlank: boolean;
}

export interface Board {
  dimension: number;
  image: string;
  blankImage: string;
  table: { [key: number]: Square };
}
