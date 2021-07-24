export interface Irgb {
  r: number;
  g: number;
  b: number;
}

export interface Irgba extends Irgb {
  a: number;
}

export interface IStringOpts {
  withAlpha?: boolean;
  quotes?: "single" | "double";
}

export type TChannel = "red" | "green" | "blue" | "alpha";
