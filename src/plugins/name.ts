import { RGBExtended } from "../enums/colors";
import { rgbaParser } from "../parsers/rgb";
import { TPlugin } from "../types/colormaster";

declare module "../colormaster" {
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

    /**
     * Generates an RGBA color from an input CSS/HTML name
     * @param name CSS/HTML color name to find
     *
     * @see {@link https://www.rapidtables.com/web/color/RGB_Color.html} for list of names
     * @returns The RGBA color instance corresponding to the `name`
     */
    fromName(name: keyof typeof RGBExtended): ColorMaster;
  }
}

const NamePlugin: TPlugin = (CM): void => {
  CM.prototype.name = function ({ exact = true }: { exact?: boolean } = {}): string {
    const { a } = this.rgba();

    if (a === 0) return "transparent";

    const rgbStr = this.stringRGB({ withAlpha: false });
    const parsedObj = rgbaParser(rgbStr)[0];

    const [keys, values] = [Object.keys(RGBExtended), Object.values(RGBExtended)];

    let matchStr: string | undefined;
    if (parsedObj) {
      if (exact) {
        matchStr = keys.find((key) => RGBExtended[key as keyof typeof RGBExtended] === rgbStr);
      } else {
        const { r, g, b } = parsedObj;
        let minDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < values.length; i++) {
          const [Rp, Gp, Bp] = values[i].match(/\d{1,3}/g)?.map((val) => +val) ?? [0, 0, 0];

          const currDist = Math.abs(Rp - r) + Math.abs(Gp - g) + Math.abs(Bp - b);
          if (currDist < minDist) {
            minDist = currDist;
            matchStr = keys[i];
          }
        }
      }
    }

    return matchStr ? matchStr + (a < 1 ? " (with opacity)" : "") : "undefined";
  };

  CM.prototype.fromName = function (name: keyof typeof RGBExtended) {
    const [r, g, b] = RGBExtended[name].match(/\d{1,3}/g)?.map((val) => +val) ?? [0, 0, 0];
    return new CM({ r, g, b });
  };
};

export default NamePlugin;
