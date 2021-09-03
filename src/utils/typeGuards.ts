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
  Ixyza,
  Iluv,
  Iluva,
  Iryb,
  Iryba,
  Iuvw,
  Iuvwa
} from "../types";

export function isRGBObject(type: TInput): type is Irgb | Irgba {
  const { r, g, b } = type as Irgb;
  return r !== undefined && g !== undefined && b !== undefined && typeof r === "number";
}

export function isHEXObject(type: TInput): type is Ihex | Ihexa {
  const { r, g, b } = type as Ihex;
  return r !== undefined && g !== undefined && b !== undefined && typeof r === "string";
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

export function isLUVObject(type: TInput): type is Iluv | Iluva {
  const { l, u, v } = type as Iluv;
  return l !== undefined && u !== undefined && v != undefined;
}

export function isUVWObject(type: TInput): type is Iuvw | Iuvwa {
  const { u, v, w } = type as Iuvw;
  return u !== undefined && v !== undefined && w !== undefined;
}

export function isRYBObject(type: TInput): type is Iryb | Iryba {
  const { r, y, b } = type as Iryb;
  return r !== undefined && y !== undefined && b !== undefined;
}

export function isCMYKObject(type: TInput): type is Icmyk | Icmyka {
  const { c, m, y, k } = type as Icmyk;
  return c !== undefined && m !== undefined && y !== undefined && k !== undefined;
}
