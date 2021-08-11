import { ColorMaster } from "../colormaster";
import { rng } from "../utils/numeric";

declare module "../colormaster" {
  interface ColorMaster {
    /**
     * Generates a random RGBA color which can then be converted into any color space
     * @returns A random RGBA color instance that is properly bounded
     */
    random(): ColorMaster;
  }
}

ColorMaster.prototype.random = function (): ColorMaster {
  return new ColorMaster({ r: rng(255), g: rng(255), b: rng(255), a: Math.random() });
};
