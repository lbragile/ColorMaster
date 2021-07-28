import { BOUNDS } from "../enums/bounds";
import { IStringOpts, TChannel } from "../types/common";
import { Ihexa } from "../types/hex";
import { clamp } from "../utils/numeric";
import HSLColors from "./hsl";
import RGBColors from "./rgb";

export default class HEXColors {
  #hexa: Ihexa;

  constructor(r: string, g: string, b: string, a = "FF") {
    // set values to reasonable numbers if provided value is undefined
    if (r === undefined || g === undefined || b === undefined) {
      r = r ?? "00";
      g = g ?? "00";
      b = b ?? "00";
    }

    // make sure all elements are the same case when clamping. Also ensure that each channel is 2 characters
    const [Rp, Gp, Bp, Ap] = [r, g, b, a].map((val) =>
      clamp("00", val.padStart(2, "0").toUpperCase(), BOUNDS.HEX_CHANNEL_UPPER)
    );

    this.#hexa = { r: Rp, g: Gp, b: Bp, a: Ap };
  }

  get hexaObj(): Ihexa {
    return this.#hexa;
  }

  set hexaObj(obj: Ihexa) {
    this.#hexa = obj;
  }

  /**
   * Gives the string representation of an input HSLA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   * @returns ```'#RRGGBBAA?'``` or ```"RRGGBBAA?"```
   * @example ({ r: "FF", g: "77", b: "00", a: "77" }).string({ quotes: 'double' }) → "#FF770077"
   */
  string({ withAlpha = true, quotes = "single" }: IStringOpts = {}): string {
    const { r, g, b, a } = this.#hexa;
    const quote = quotes === "single" ? "'" : '"';
    const [Rp, Gp, Bp, Ap] = [r, g, b, a].map((val) => val.slice(0, 2));
    const alpha = withAlpha ? Ap : "";
    return `${quote}#${Rp}${Gp}${Bp}${alpha}${quote}`;
  }

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which HEXA channel to set
   * @param value In range ['00', 'FF']
   *
   * @note 'value' can also be 1 character, in which case it will be padded with a leading '0'
   * @returns The instance that was acted upon → for function chaining
   */
  channelValueTo(channel: TChannel, value: string): HEXColors {
    value = value.toUpperCase() > "FF" ? "FF" : value;
    const argVal = parseInt(value.padStart(2, "0"), 16);

    return this.rgb()
      .channelValueTo(channel, channel === "alpha" ? argVal / BOUNDS.RGB_CHANNEL : argVal)
      .hex();
  }

  /**
   * Instead of setting the value as in {@link HSLColors.channelValueTo channelValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which HEXA channel to increment/decrement
   * @param delta A 1 or 2 character string to adjust the channel by
   * @param type Either 'add' or 'sub' indicating whether the delta should be positive or negative
   * @returns The instance that was acted upon → for function chaining
   */
  channelValueBy(channel: TChannel, delta: string, type: "add" | "sub"): HEXColors {
    const numericDelta = parseInt(delta.padStart(2, "0"), 16);
    const signedDelta = type === "add" ? numericDelta : -1 * numericDelta;
    return this.rgb()
      .channelValueBy(channel, channel === "alpha" ? signedDelta / BOUNDS.RGB_CHANNEL : signedDelta)
      .hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueTo channelValueTo} with "alpha" as the channel
   * @param value Must be in range ["00", "FF"]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: string): HEXColors {
    return this.channelValueTo("alpha", value);
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in ["00", "FF"]
   * @param type Either 'add' or 'sub' indicating whether the delta should be positive or negative
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: string, type: "add" | "sub"): HEXColors {
    return this.channelValueBy("alpha", delta, type);
  }

  /**
   * Converts a HEXA color to RGBA color
   *
   * @returns {RGBColors} An RGBA instance that can be acted upon → for function chaining
   */
  rgb(): RGBColors {
    const hexParts = this.string().match(/\w\w/gi);
    if (!hexParts) throw new Error("Impossible to convert as the provided HEX string is invalid");
    const [r, g, b, a] = hexParts.map((part) => parseInt(part, 16));
    return new RGBColors(r, g, b, a / BOUNDS.RGB_CHANNEL);
  }

  /**
   * Converts a HEXA color to HSLA color
   *
   * @note First the color is converted to RGBA space, then HSLA
   * @returns {HSLColors} An HSLA instance that can be acted upon → for function chaining
   */
  hsl(): HSLColors {
    return this.rgb().hsl();
  }

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   *
   * @note Here ColorMaster first converts to RGBA color space, does the inversion, and converts back to HSLA colorspace
   * @link https://pinetools.com/invert-color
   * @returns The corresponding inverse color
   */
  invert({ includeAlpha = true }: { includeAlpha?: boolean } = {}): HEXColors {
    return this.rgb().invert({ includeAlpha }).hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "saturation" as the channel
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: string): HEXColors {
    return this.hsl()
      .saturateBy((parseInt(delta, 16) * BOUNDS.HSL_SATURATION) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.saturateBy saturateBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: string): HEXColors {
    return this.hsl()
      .desaturateBy((parseInt(delta, 16) * BOUNDS.HSL_SATURATION) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.channelValueBy channelValueBy} with "lightness" as the channel
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @note A negative value can be used, but we recommend using {@link HSLColors.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: string): HEXColors {
    return this.hsl()
      .lighterBy((parseInt(delta, 16) * BOUNDS.HSL_LIGHTNESS) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.lighterBy lighterBy} with a negative value
   * @param delta When added to current saturation value, range must remain in [0, 100]
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: string): HEXColors {
    return this.hsl()
      .darkerBy((parseInt(delta, 16) * BOUNDS.HSL_LIGHTNESS) / BOUNDS.RGB_CHANNEL)
      .hex();
  }

  /**
   * Syntactic sugar for {@link HSLColors.desaturateBy desaturateBy} with a very large delta. Sets the saturation to 0%
   *
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): HEXColors {
    return this.hsl().grayscale().hex();
  }
}
