import { Irgba, Iryba } from "../types";

/**
 * @see http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
 * @see https://web.archive.org/web/20130525061042/www.insanit.net/tag/rgb-to-ryb/
 */
export function RYBtoRGB(obj: Iryba): Irgba {
  let { r, y, b } = obj;

  const Iw = Math.min(r, y, b);

  // Remove the whiteness from the color
  [r, y, b] = [r, y, b].map((val) => val - Iw);

  const mY = Math.max(r, y, b);

  // Get the green out of the yellow+blue
  let g = Math.min(y, b);
  y -= g;
  b -= g;

  if (b && g) {
    b *= 2;
    g *= 2;
  }

  // Redistribute the remaining yellow
  r += y;
  g += y;

  // Normalize to values
  const mG = Math.max(r, g, b);
  if (mG) {
    const n = mY / mG;
    [r, g, b] = [r, g, b].map((val) => val * n);
  }

  // Add the white back in
  [r, g, b] = [r, g, b].map((val) => val + Iw);

  return { r, g, b, a: obj.a };
}
