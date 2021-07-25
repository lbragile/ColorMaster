import { IStringOpts, TChannel } from "../types/common";
import { Irgba } from "../types/rgb";
import { BOUNDS } from "../enums/bounds";
import { clamp } from "../utils/numeric";
import HSLColors from "./hsl";

export default class RGBColors {
  #rgba: Irgba;
  #rgbStr: string;

  constructor(r: number, g: number, b: number, a = 1) {
    if (r === undefined || g === undefined || b === undefined) {
      throw new Error("red, green, and blue channel values must be provided");
    }

    // clamp the values
    r = clamp(0, r, BOUNDS.RGB_CHANNEL);
    g = clamp(0, g, BOUNDS.RGB_CHANNEL);
    b = clamp(0, b, BOUNDS.RGB_CHANNEL);
    a = clamp(0, a, 1);

    this.#rgba = { r, g, b, a };
    this.#rgbStr = `'rgba(${r}, ${g}, ${b}, ${a})'`;
  }

  get rgbaObj(): Irgba {
    return this.#rgba;
  }

  set rgbaObj(obj: Irgba) {
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
  string({ withAlpha = false, quotes = "single" }: IStringOpts = {}): string {
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
  channelValueTo(channel: TChannel, value: number): this {
    value = clamp(0, value, channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL);
    this.#rgba = { ...this.#rgba, [channel[0]]: value };
    return this;
  }

  /**
   * Instead of setting the value as in {@link RGBColors.channelValueTo channelValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which RGBA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   * @returns The instance that was acted upon → for function chaining
   */
  channelValueBy(channel: TChannel, delta: number): this {
    const firstChannelLetter = channel[0] as keyof Irgba;
    const value = clamp(
      0,
      parseFloat((this.#rgba[firstChannelLetter] + delta).toFixed(2)),
      channel === "alpha" ? 1 : BOUNDS.RGB_CHANNEL
    );
    this.#rgba[channel[0] as keyof Irgba] = value;
    return this;
  }

  /**
   * Syntactic sugar for {@link RGBColors.channelValueTo channelValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: number): this {
    this.channelValueTo("alpha", value);
    return this;
  }

  /**
   * Syntactic sugar for {@link RGBColors.channelValueBy channelValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: number): this {
    this.channelValueBy("alpha", delta);
    return this;
  }

  /**
   * Converts a RGBA color to HSLA color
   *
   * @link https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   * @returns {RGBColors} An HSLA instance that can be acted upon → for function chaining
   */
  hsl(): HSLColors {
    const { r, g, b, a } = this.#rgba;
    const Rp = r / BOUNDS.RGB_CHANNEL;
    const Gp = g / BOUNDS.RGB_CHANNEL;
    const Bp = b / BOUNDS.RGB_CHANNEL;

    const Cmax = Math.max(Rp, Gp, Bp);
    const Cmin = Math.min(Rp, Gp, Bp);
    const delta = Cmax - Cmin;

    const H =
      delta === 0
        ? 0
        : Cmax === Rp
        ? ((Gp - Bp) / delta) % 6
        : Cmax === Gp
        ? (Bp - Rp) / delta + 2
        : (Rp - Gp) / delta + 4;
    const L = (Cmax + Cmin) / 2;
    const S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

    return new HSLColors(H * 60, S * BOUNDS.HSL_SATURATION, L * BOUNDS.HSL_LIGHTNESS, a);
  }

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   * @returns The corresponding inverse color
   */
  invert({ includeAlpha = false }: { includeAlpha?: boolean } = {}): this {
    const { r, g, b, a } = this.#rgba;
    const [Rnew, Gnew, Bnew] = [r, g, b].map((val) => BOUNDS.RGB_CHANNEL - val);
    const Anew = includeAlpha ? parseFloat((1 - a).toFixed(2)) : a;
    this.rgbaObj = { r: Rnew, g: Gnew, b: Bnew, a: Anew };
    return this;
  }

  /**
   * Saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.saturateBy saturateBy} for functionality
   * @note A negative value can be used, but we recommend using {@link RGBColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: number): RGBColors {
    return this.hsl().saturateBy(delta).rgb();
  }

  /**
   * De-saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.desaturateBy desaturateBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: number): RGBColors {
    return this.hsl().desaturateBy(delta).rgb();
  }

  /**
   * Adds lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.lighterBy lighterBy} for functionality
   * @note A negative value can be used, but we recommend using {@link RGBColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: number): RGBColors {
    return this.hsl().lighterBy(delta).rgb();
  }

  /**
   * Removes lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.darkerBy darkerBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: number): RGBColors {
    return this.hsl().darkerBy(delta).rgb();
  }

  /**
   * Sets the saturation of the color to 0% in HSLA space to get the corresponding RGBA space color
   *
   * @see {@link HSLColors.grayscale grayscale} for functionality
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): RGBColors {
    return this.hsl().grayscale().rgb();
  }
}
