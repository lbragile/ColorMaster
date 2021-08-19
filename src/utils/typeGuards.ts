import {
  TInput,
  Ihex,
  Ihexa,
  Ihsl,
  Ihsla,
  Ihsv,
  Ihsva,
  Irgb,
  Irgba,
  Ilaba,
  Ilab,
  Ilch,
  Ilcha,
  Ihwb,
  Ihwba,
  Icmyk,
  Icmyka,
  Ixyz,
  Ixyza
} from "../types";

export function isRGBObject(type: TInput): type is Irgb | Irgba {
  const { r } = type as Irgb;
  return r !== undefined && typeof r === "number";
}

export function isHEXObject(type: TInput): type is Ihex | Ihexa {
  const { r } = type as Ihex;
  return r !== undefined && typeof r === "string";
}

export function isHSLObject(type: TInput): type is Ihsl | Ihsla {
  const { h, s, l } = type as Ihsl;
  return h !== undefined && s !== undefined && l !== undefined;
}

export function isHSVObject(type: TInput): type is Ihsv | Ihsva {
  const { h, s, v } = type as Ihsv;
  return h !== undefined && s !== undefined && v !== undefined;
}

export function isHWBObject(type: TInput): type is Ihwb | Ihwba {
  const { h, w, b } = type as Ihwb;
  return h !== undefined && w !== undefined && b !== undefined;
}

export function isLABObject(type: TInput): type is Ilab | Ilaba {
  const { l, a, b } = type as Ilab;
  return l !== undefined && a !== undefined && b !== undefined;
}

export function isLCHObject(type: TInput): type is Ilch | Ilcha {
  const { l, c, h } = type as Ilch;
  return l !== undefined && c !== undefined && h !== undefined;
}

export function isXYZObject(type: TInput): type is Ixyz | Ixyza {
  const { x, y, z } = type as Ixyz;
  return x !== undefined && y !== undefined && z !== undefined;
}

export function isCMYKObject(type: TInput): type is Icmyk | Icmyka {
  const { c, m, y, k } = type as Icmyk;
  return c !== undefined && m !== undefined && y !== undefined && k !== undefined;
}
