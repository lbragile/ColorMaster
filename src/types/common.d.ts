export interface IStringOpts {
  withAlpha?: boolean;
  quotes?: "single" | "double";
  precision?: TNumArr;
}

export type TChannel = "red" | "green" | "blue" | "alpha";

export type TNumArr = [number, number, number, number?];
export type TStrArr = [string, string, string, string?];
