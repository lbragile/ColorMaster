// import { HexColors } from "../enums/colors";

export interface Irgba {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface IStringOpts {
  withAlpha?: boolean;
  quotes?: "single" | "double";
}

type TChannel = "red" | "green" | "blue" | "alpha";

// TODO create a common util folder
function clamp(min: number, val: number, max: number): number {
  return Math.min(Math.max(min, val), max);
}
export default class RGBColors {
  #rgba: Irgba = { r: 0, g: 0, b: 0, a: 1 };
  #rgbStr = "rgb(128, 128, 128)";

  constructor(r: number, g: number, b: number, a?: number) {
    this.#rgba = { ...this.#rgba, r, g, b, a: a ?? this.#rgba.a };
  }

  public get rgbaObj() {
    return this.#rgba;
  }

  public set rgbaObj(obj: Irgba) {
    this.#rgba = obj;
  }

  /**
   * Gives the string representation of an input RGBA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   * @returns ```'(r, g, b, a?)'``` or ```"(r, g, b, a?)"```
   * @example ({ r: 128, g: 64, b: 32, a: 0.5 }).string({ withAlpha: true, quotes: 'double' }) → "(128, 64, 32, 0.5)"
   */
  public string({ withAlpha = false, quotes = "single" }: IStringOpts = {}): string {
    const { r, g, b, a } = this.#rgba;
    const quote = quotes === "single" ? "'" : '"';
    const alpha = withAlpha ? ", " + a : "";
    this.#rgbStr = `${quote}rgb(${r}, ${g}, ${b}${alpha})${quote}`;
    return this.#rgbStr;
  }

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which RGBA channel to set
   * @param value In range [0, 255] for red, green, blue. In range [0, 1] for alpha
   * @returns The instance that was acted upon → for function chaining
   */
  public channelValueTo(channel: TChannel, value: number): this {
    value = clamp(0, value, channel === "alpha" ? 1 : 255);
    this.#rgba = { ...this.#rgba, [channel[0]]: value };
    return this;
  }

  /**
   * Instead of setting the value as in {@link RGBColors.channelValueTo channelValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which RGBA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   * @returns The instance that was acted upon → for function chaining
   */
  public channelValueBy(channel: TChannel, delta: number): this | Error {
    const firstChannelLetter = channel[0] as keyof Irgba;
    const value = clamp(0, (this.#rgba[firstChannelLetter] ?? 0) + delta, channel === "alpha" ? 1 : 255);
    this.#rgba[channel[0] as keyof Irgba] = value;
    return this;
  }

  /**
   * Syntactic sugar for {@link RGBColors.channelValueTo channelValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  public alphaTo(value: number): this {
    this.channelValueTo("alpha", value);
    return this;
  }

  /**
   * Syntactic sugar for {@link RGBColors.channelValueBy channelValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  public alphaBy(delta: number): this {
    this.channelValueBy("alpha", delta);
    return this;
  }
}
