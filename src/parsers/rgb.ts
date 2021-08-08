import { Ihexa, Ihsla, Irgba } from "../types/common";

const RGBA_RE = /rgba?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(0\.?\d*%?|1\.?0*%?)\s*\)/gi;

export function rgbaParser(color: string): Irgba | null {
  const matches = RGBA_RE.exec(color);
  if (matches) {
    const [r, g, b, a] = matches
      .slice(1, 5)
      .map((elem, i) => (elem.includes("%") ? +elem.slice(-1) * (i < 3 ? 2.55 : 1) : +elem));
    return { r, g, b, a: a ?? 1 };
  }
  return null;
}

export function RGBtoHEX(obj: Irgba): Ihexa {
  const { r, g, b, a } = obj;
  const [Rp, Gp, Bp, Ap] = [r, g, b, Math.round(a * 255) ?? 255].map((x) => x.toString(16).padStart(2, "0"));
  return { r: Rp, g: Gp, b: Bp, a: Ap };
}

export function RGBtoHSL(obj: Irgba): Ihsla {
  const [Rp, Gp, Bp] = Object.values(obj).map((val) => val / 255);

  const Cmax = Math.max(Rp, Gp, Bp);
  const Cmin = Math.min(Rp, Gp, Bp);
  const delta = Cmax - Cmin;

  const H =
    delta === 0
      ? 0
      : Cmax === Rp
      ? ((Gp - Bp) / delta) % 6
      : Cmax === Gp
      ? (Bp - Rp) / delta + 2
      : (Rp - Gp) / delta + 4;
  const L = (Cmax + Cmin) / 2;
  const S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

  return { h: H * 60, s: S * 100, l: L * 100, a: obj.a ?? 1 };
}
