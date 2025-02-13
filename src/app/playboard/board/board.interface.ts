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
  initialTable: { [key: number]: Square };
  table: { [key: number]: Square };
}
