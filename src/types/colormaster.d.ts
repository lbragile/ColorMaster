import { ColorMaster } from "../colormaster";
import { HueColors, RGBExtended } from "../enums/colors";
import {
  THarmony,
  IMonochromatic,
  IA11yOpts,
  IAlphaInvert,
  IReadable,
  Irgba,
  IStringOpts,
  TChannel,
  TNumArr,
  TInput,
  Ihexa,
  Ihsla
} from "./common";

export interface IColorMaster {
  /**
   * the RGBA color instance as an object
   */
  readonly object: Irgba;

  /**
   * the RGBA color instance as an array
   */
  readonly array: Required<TNumArr>;

  /**
   * the color format of a RGBA color instance
   * @note Useful when you are using variables and are not sure what color space the color is from
   */
  readonly format: string;

  /**
   * the red channel value of this RGBA color instance
   */
  readonly red: number;

  /**
   * the blue channel value of this RGBA color instance
   */
  readonly blue: number;

  /**
   * the green channel value of this RGBA color instance
   */
  readonly green: number;

  /**
   * the alpha channel channel value of this RGBA color instance
   */
  readonly alpha: number;

  /**
   * the hue channel value from the corresponding HSLA color space
   */
  readonly hue: number;

  /**
   * the saturation channel value from the corresponding HSLA color space
   */
  readonly saturation: number;

  /**
   * the lightness channel value from the corresponding HSLA color space
   */
  readonly lightness: number;

  /**
   * Gives the string representation of an input RGBA color object
   * @param opts -
   *  - withAlpha → whether or not to include the alpha channel in the output
   *  - quotes → type of quotes to use around the output
   *  - precision → how many decimal places to include for each value
   * @returns ```rgba?(r, g, b, a?)```
   * @example ({ r: 128, g: 64, b: 32, a: 0.5 }).string() → "rgba(128, 64, 32, 0.5)"
   */
  string({ withAlpha, precision }: IStringOpts): string;

  /**
   * Gets the color table HTML/CSS name for a given color
   * @param opts - exact → If true - attempts to find an exact match (undefined if not found), else finds the nearest color name
   *
   * @note Colors with an alpha value of '0' return 'transparent'. Also, colors with alpha < 1, return `CSS_NAME (with opacity)`
   * @example CM.RGBAFrom("rgb(128, 0, 0)").name() → "maroon"
   * @returns The color's HTML/CSS name
   */
  name(opts: { exact?: boolean }): string;

  /**
   * Converts a RGBA color to HSLA color
   *
   * @link https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   * @returns {ColorMaster} An HSLA instance that can be acted upon → for function chaining
   */
  hsl(): Ihsla;

  /**
   * Converts a RGBA color to HEXA color
   *
   * @returns {HEXColors} An HEXA instance that can be acted upon → for function chaining
   */
  hex(): Ihexa;

  /**
   * Lets you set a single channel value to a specific number
   * @param channel Which RGBA channel to set
   * @param value In range [0, 255] for red, green, blue. In range [0, 1] for alpha
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueTo(channel: TChannel, value: number): ColorMaster;

  /**
   * Instead of setting the value as in {@link ColorMaster.changeValueTo changeValueTo}, this allows you to adjust the channel value by `delta` amount.
   * @param channel Which RGBA channel to increment/decrement
   * @param delta A positive OR negative integer/decimal number to adjust the channel by
   * @returns The instance that was acted upon → for function chaining
   */
  changeValueBy(channel: TChannel, delta: number): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueTo changeValueTo} with "hue" as the channel (done in HSLA space and converted back to RGBA space)
   * @param value Must be in range [0, 359] or a CSS/HTML color name
   * @returns The instance that was acted upon → for function chaining
   */
  hueTo(value: number | keyof typeof HueColors): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueBy changeValueBy} with "hue" as the channel (done in HSLA space and converted back to RGBA space)
   * @param delta When added to current alpha value, range must remain in [0, 359]
   * @returns The instance that was acted upon → for function chaining
   */
  hueBy(delta: number): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueTo changeValueTo} with "alpha" as the channel
   * @param value Must be in range [0, 1] as this is the alpha channel
   * @returns The instance that was acted upon → for function chaining
   */
  alphaTo(value: number): ColorMaster;

  /**
   * Syntactic sugar for {@link ColorMaster.changeValueBy changeValueBy} with "alpha" as the channel
   * @param delta When added to current alpha value, range must remain in [0, 1]
   * @returns The instance that was acted upon → for function chaining
   */
  alphaBy(delta: number): ColorMaster;

  /**
   * Given an input color, get its inverse value by subtracting current value from the upper bound for each channel
   * @param { includeAlpha } opts Whether or not to also invert the alpha channel
   * @returns The corresponding inverse color
   */
  invert({ includeAlpha }: IAlphaInvert): ColorMaster;

  /**
   * Saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.saturateBy saturateBy} for functionality
   * @note A negative value can be used, but we recommend using {@link ColorMaster.desaturateBy desaturateBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  saturateBy(delta: number): ColorMaster;

  /**
   * De-saturates (intensity) the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.desaturateBy desaturateBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  desaturateBy(delta: number): ColorMaster;

  /**
   * Adds lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current lightness value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.lighterBy lighterBy} for functionality
   * @note A negative value can be used, but we recommend using {@link ColorMaster.darkerBy darkerBy} for clarity
   * @returns The instance that was acted upon → for function chaining
   */
  lighterBy(delta: number): ColorMaster;

  /**
   * Removes lightness (tone) of the color in HSLA space to get the corresponding RGBA space color
   * @param delta When added to current saturation value, range must remain in [0, 100]
   *
   * @see {@link HSLColors.darkerBy darkerBy} for functionality
   * @returns The instance that was acted upon → for function chaining
   */
  darkerBy(delta: number): ColorMaster;

  /**
   * Sets the saturation of the color to 0% in HSLA space to get the corresponding RGBA space color
   *
   * @see {@link HSLColors.grayscale grayscale} for functionality
   * @note The lightness of the color remains unchanged by this operation
   * @returns The instance that was acted upon → for function chaining
   */
  grayscale(): ColorMaster;

  /**
   * Rotation changes the hue of a color by `value` degrees in HSLA space
   * @returns The instance that was acted upon → for function chaining
   */
  rotate(value: number): ColorMaster;

  /**
   * Finds the closest Web Safe color to the current color from the list at: https://www.rapidtables.com/web/color/Web_Safe.html
   * @returns The instance that was acted upon → for function chaining
   */
  closestWebSafe(): ColorMaster;

  /**
   * Finds the normalized brightness of the color
   *
   * @param opts -
   * - precision → How many decimal places to use in the output
   * - percentage → Whether or not to multiply the output by 100
   *
   * @see {@link https://www.w3.org/TR/AERT/#color-contrast}
   * @returns A value in the range [0, 1] = [dim (black), bright (white)] (or [0, 100] if `percentage = true`)
   */
  brightness(): number;

  /**
   * Finds normalized relative luminance of the color
   *
   * @param opts -
   * - precision → How many decimal places to use in the output
   * - percentage → Whether or not to multiply the output by 100
   *
   * @see {@link https://www.w3.org/TR/WCAG20/#relativeluminancedef}
   * @returns A value in the range [0, 1] = [darkest black, lightest white] (or [0, 100] if `percentage = true`)
   */
  luminance(opts: IA11yOpts): number;

  /**
   * Given a background color as input, determines the contrast ratio if the current color is used as the foreground color
   *
   * @param bgColor the background RGBA color instance
   * @param opts -
   * - precision → How many decimal places to use in the output
   * - ratio → Whether or not to append `:1` to the output (express as a ratio)
   *
   * @note This ratio will range from `1:1 → white fg : white bg` to `21:1 → black fg : white bg`
   * @see {@link ColorMaster.readableOn readableOn} for readable contrast ratios
   * @returns The contrast between current color instance and `bgColor` as a number (value → `ratio = false`) or string ("value:1" → `ratio = true`)
   */
  contrast(bgColor: TInput | ColorMaster, opts: IA11yOpts): string | number;

  /**
   * Determines if a given color is light based on its brightness (brightness ≥ 0.50)
   */
  isLight(): boolean;

  /**
   * Determines if a given color is dark based on its brightness (brightness < 0.50)
   */
  isDark(): boolean;

  /**
   * Given a background color as input, determines if the current color is readable if it is used as the foreground color
   *
   * |           | Minimum | Enhanced |
   * | :-------- | :------ | :------- |
   * | **Body**  |  4.5:1  |  7.0:1   |
   * | **Large** |  3.0:1  |  4.5:1   |
   *
   * @param bgColor the background RGBA color instance
   * @param opts -
   * - size → Either "body" or "large" text size (large is 120-150% larger than body text)
   * - ratio → Either "minimum" ("AA" rating) or "enhanced" ("AAA" rating)
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast}
   * @returns Whether or not the color is readable on `bgColor`
   */
  readableOn(bgColor: TInput | ColorMaster, opts: IReadable): boolean;

  /**
   * Given an input color to compare with, determine if that color is identical to the current color instance
   * @returns True if the two color instances are identical (same RGBA channel values). False otherwise.
   */
  equalTo(compareColor: TInput | ColorMaster): boolean;

  /**
   * Generates an RGBA color instance array based on the corresponding harmony
   *
   * @param type The color harmony to apply
   * @opts Only apply to 'monochromatic' harmony
   * - effect → 'tints' (add white/add lightness), 'shades' (add black/remove lightness), 'tones' (add grey/remove saturation)
   * - amount → the number of elements to return
   *
   * @see {@link // https//www.tigercolor.com/color-lab/color-theory/color-harmonies.htm}
   * @note For 'monochromatic', the amount must be in range [2, 10]
   * @returns - All harmony types return an array with the original color as the first element.
   *          - The only exception to this are 'analogous' and 'double-split-complementary',
   *            which return the original color as the second element.
   *          - For 'monochromatic' the original color is always first and the array size is `amount + 1` evenly spaced colors.
   */
  harmony(type: THarmony, opts: IMonochromatic): ColorMaster[];

  /**
   * "Cool colors give an impression of calm, and create a soothing impression"
   *
   * These typically contain more blue and green pigmentation (higher hue)
   *
   * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
   */
  isCool(): boolean;

  /**
   * "Warm colors are vivid and energetic, and tend to advance in space"
   *
   * These typically contain more red and yellow pigmentation (lower hue)
   *
   * @see {@link https://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm} or {@link https://www.canva.com/colors/color-wheel/}
   */
  isWarm(): boolean;

  /**
   * Finds the closest cool color instance to the current color (in HSLA space)
   */
  closestCool(): ColorMaster;

  /**
   * Finds the closest warm color instance to the current color (in HSLA space)
   */
  closestWarm(): ColorMaster;

  /**
   * Helper for determining if a given color instance is tinted (lightness deviated upwards from a pure hue whose lightness is 50%)
   */
  isTinted(): boolean;

  /**
   * Helper for determining if a given color instance is shaded (lightness deviated downwards from a pure hue whose lightness is 50%)
   */
  isShaded(): boolean;

  /**
   * Helper for determining if a given color instance is toned (saturation deviated from a pure hue whose saturation is 100%)
   */
  isToned(): boolean;

  /**
   * Helper for determining if a given color instance is pure (not tinted, shaded, or toned)
   * @param opts - reason → Whether or not to include a reason for the output
   *
   * @note `reason` only provides extra information when the color instance is not pure hue
   */
  isPureHue(opts: { reason?: boolean }): boolean | { pure: boolean; reason: string };

  /**
   * Finds the closest pure hue color instance corresponding to the current color (in HSLA space)
   *
   * @note Alpha channel value is preserved
   */
  closestPureHue(): ColorMaster;

  /**
   * Generates a random RGBA color which can then be converted into any color space
   * @returns A random RGBA color instance that is properly bounded
   */
  random(): ColorMaster;

  /**
   * Generates an RGBA color from an input CSS/HTML name
   * @param name CSS/HTML color name to find
   *
   * @see {@link https://www.rapidtables.com/web/color/RGB_Color.html} for list of names
   * @returns The RGBA color instance corresponding to the `name`
   */
  fromName(name: keyof typeof RGBExtended): ColorMaster;
}
