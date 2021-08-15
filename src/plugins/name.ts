import { RGBExtended } from "../enums/colors";
import { TPlugin, Irgba, TFormat, TParser } from "../types";
import { channelWiseDifference, getRGBArr } from "../utils/numeric";

declare module ".." {
  interface ColorMaster {
    /**
     * Gets the color table HTML/CSS name for a given color
     * @param opts - exact → If true - attempts to find an exact match (undefined if not found), else finds the nearest color name
     *
     * @note Colors with an alpha value of '0' return 'transparent'. Also, colors with alpha < 1, return `CSS_NAME (with opacity)`
     * @example CM.RGBAFrom("rgb(128, 0, 0)").name() → "maroon"
     * @returns The color's HTML/CSS name
     */
    name(opts?: { exact?: boolean }): string;
  }
}

const NamePlugin: TPlugin = (CM): void => {
  CM.prototype.name = function ({ exact = true } = {}) {
    const { r, g, b, a } = this.rgba();

    if (a === 0) return "transparent";

    const [keys, values] = [Object.keys(RGBExtended), Object.values(RGBExtended)];

    let matchStr: string | undefined;
    if (exact) {
      const rgbStr: string = this.stringRGB({ alpha: false }).replace(/\s/g, "");
      matchStr = keys.find((key) => RGBExtended[key as keyof typeof RGBExtended] === rgbStr);
    } else {
      let minDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < values.length; i++) {
        const currDist = channelWiseDifference(getRGBArr(values[i]), [r, g, b]);
        if (currDist < minDist) {
          minDist = currDist;
          matchStr = keys[i];
        }
      }
    }

    return matchStr ? matchStr + (a < 1 ? " (with opacity)" : "") : "undefined";
  };

  /**
   * Generates an RGBA color from an input CSS/HTML name
   * @param color CSS/HTML color name to find
   *
   * @see {@link https://www.rapidtables.com/web/color/RGB_Color.html} for list of names
   * @returns The RGBA color instance corresponding to the `name`
   */
  function nameParser(color: keyof typeof RGBExtended): [Irgba, TFormat] {
    if (Object.keys(RGBExtended).includes(color)) {
      const [r, g, b] = getRGBArr(RGBExtended[color]);
      return [{ r, g, b, a: 1 }, "name"];
    } else {
      return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
    }
  }

  CM.Parsers.push(nameParser as TParser);
};

export default NamePlugin;
