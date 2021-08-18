import { TInput, Irgba, TFormat, Iluva } from "../types";
import { clamp } from "../utils/numeric";
import { isLUVObject } from "../utils/typeGuards";
import { LUVtoRGB } from "../conversions/luv";

/**
 * @see {@link https://en.wikipedia.org/wiki/CIELUV#Cylindrical_representation_.28CIELCH.29}
 * @note For typical images, u and v range is ±100%. By definition, 0 ≤ L ≤ 100%.
 */
const LUVA_RE =
  /luva?\s*\(\s*([+-]?\d*\.?\d+%?),?\s*([+-]?\d*\.?\d+%?),?\s*([+-]?\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+)?\s*\)/gi;

function createReturnArr({ l, u, v, a }: Iluva): [Irgba, TFormat] {
  return [
    LUVtoRGB({ l: clamp(0, l, 100), u: clamp(-100, u, 100), v: clamp(-100, v, 100), a: a ? clamp(0, a, 1) : 1 }),
    "luv"
  ];
}

export function luvaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isLUVObject(color)) {
    return createReturnArr(color as Iluva);
  } else if (typeof color === "string") {
    LUVA_RE.lastIndex = 0;

    const matches = LUVA_RE.exec(color);
    if (matches) {
      const [l, u, v, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ l, u, v, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
