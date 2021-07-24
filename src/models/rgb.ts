import { Irgba, IStringOpts, TChannel } from "../types/rgb";
import { clamp } from "../utils/numeric";

export default class RGBColors {
  #rgba: Irgba;
  #rgbStr: string;

  constructor(r: number, g: number, b: number, a = 1) {
    if (r === undefined || g === undefined || b === undefined) {
      throw new Error("red, green, and blue channel values must be provided");
    }

    // clamp the values
    r = clamp(0, r, 255);
    g = clamp(0, g, 255);
    b = clamp(0, b, 255);
    a = clamp(0, a, 1);

    this.#rgba = { r, g, b, a };
  }

  public get rgbaObj(): Irgba {
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
   * @returns ```'rgba?(r, g, b, a?)'``` or ```"rgba?(r, g, b, a?)"```
   * @example ({ r: 128, g: 64, b: 32, a: 0.5 }).string({ withAlpha: true, quotes: 'double' }) → "rgba(128, 64, 32, 0.5)"
   */
  public string({ withAlpha = false, quotes = "single" }: IStringOpts = {}): string {
    const { r, g, b, a } = this.#rgba;
    const quote = quotes === "single" ? "'" : '"';
    const alpha = withAlpha ? ", " + a : "";
    this.#rgbStr = `${quote}rgb${withAlpha ? "a" : ""}(${r}, ${g}, ${b}${alpha})${quote}`;
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
  public channelValueBy(channel: TChannel, delta: number): this {
    const firstChannelLetter = channel[0] as keyof Irgba;
    const value = clamp(
      0,
      parseFloat((this.#rgba[firstChannelLetter] + delta).toFixed(2)),
      channel === "alpha" ? 1 : 255
    );
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
