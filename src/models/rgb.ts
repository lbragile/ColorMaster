// import { HexColors } from "../enums/colors";

interface Irgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

type TChannel = "red" | "green" | "blue";

export default class RGBColors {
  #rgb: Irgb = { r: 0, g: 0, b: 0, a: 1 };
  public rgbStr = "rgb(128, 128, 128)";

  constructor(r: number, g: number, b: number) {
    this.#rgb = { r, g, b, a: 1 };
  }

  public get rgbObj() {
    return this.#rgb;
  }

  public set rgbObj(obj: Irgb) {
    this.#rgb = obj;
  }

  public string(withAlpha = false): string {
    const { r, g, b, a } = this.#rgb;
    this.rgbStr = `'rgb(${r}, ${g}, ${b + (withAlpha ? ", " + a : "")})'`;
    return this.rgbStr;
  }

  public alpha(value: number): RGBColors {
    this.#rgb.a = value;
    return this;
  }

  public changeChannelValue(channel: TChannel, value: number) {
    this.#rgb = { ...this.#rgb, [channel[0].toLowerCase()]: value };
    return this;
  }
}
