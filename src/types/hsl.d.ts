export interface Ihsl {
  h: number;
  s: number;
  l: number;
}

export interface Ihsla extends Ihsl {
  a: number;
}

export type TChannelHSL = "hue" | "saturation" | "lightness" | "alpha";
