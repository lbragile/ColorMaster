import { XYZtoRGB } from "../conversions/xyz";
import { D50Ref } from "../enums/cie";
import { TInput, TFormat, Ixyza, Irgba } from "../types";
import { clamp } from "../utils/numeric";
import { isXYZObject } from "../utils/typeGuards";

/**
 * xyza[a]( <number | percentage>{3} [ / <alpha-value> ]? )
 * @see {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 */
const XYZA_RE = /xyza?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ x, y, z, a }: Ixyza): [Irgba, TFormat] {
  a = a ? clamp(0, a, 1) : 1;

  const { r, g, b } = XYZtoRGB({
    x: clamp(0, x, D50Ref.x * 100),
    y: clamp(0, y, D50Ref.y * 100),
    z: clamp(0, z, D50Ref.z * 100),
    a
  });

  return [{ r: clamp(0, r, 255), g: clamp(0, g, 255), b: clamp(0, b, 255), a }, "xyz"];
}

export function xyzaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isXYZObject(color)) {
    return createReturnArr(color as Ixyza);
  } else if (typeof color === "string") {
    XYZA_RE.lastIndex = 0;

    const matches = XYZA_RE.exec(color);
    if (matches) {
      const [x, y, z, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ x, y, z, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
