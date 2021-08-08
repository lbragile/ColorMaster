import { Irgba, Ihsla } from "../types/common";

const HSLA_RE = /hsla?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(0\.?\d*%?|1\.?0*%?)\s*\)/gi;

export function hslaParser(color: string): Irgba | null {
  const matches = HSLA_RE.exec(color);
  if (matches) {
    const [h, s, l, a] = matches
      .slice(1, 5)
      .map((elem, i) => (elem.includes("%") ? +elem.slice(-1) * (i === 0 ? 3.59 : 1) : +elem));
    return HSLtoRGB({ h, s, l, a: a ?? 1 });
  }
  return null;
}

export function HSLtoRGB(obj: Ihsla): Irgba {
  const { h, s, l, a } = obj;
  const L = l / 100;
  const S = s / 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = L - C / 2;

  const Rp = h < 60 || (300 <= h && h < 360) ? C : 120 <= h && h < 240 ? 0 : X;
  const Gp = 240 <= h && h < 360 ? 0 : 60 <= h && h < 180 ? C : X;
  const Bp = h < 120 ? 0 : 180 <= h && h < 300 ? C : X;

  const [r, g, b] = [Rp, Gp, Bp].map((val) => (val + m) * 255);
  return { r, g, b, a: a ?? 1 };
}
