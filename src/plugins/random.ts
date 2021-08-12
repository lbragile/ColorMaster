import { TPlugin } from "../types/colormaster";
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

const RandomPlugin: TPlugin = (CM): void => {
  CM.prototype.random = function () {
    return new CM({ r: rng(255), g: rng(255), b: rng(255), a: Math.random() });
  };
};

export default RandomPlugin;
