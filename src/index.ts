import { ColorMaster } from "./colormaster";

console.log(new ColorMaster({ r: 128, g: 64, b: 32, a: 1 }).string());
console.log(new ColorMaster({ r: 128, g: 64, b: 32, a: 1 }).name({ exact: false }));
console.log(new ColorMaster({ r: 128, g: 64, b: 32, a: 1 }).invert().string());
console.log(new ColorMaster({ r: 128, g: 64, b: 32, a: 1 }).invert({ includeAlpha: true }).string());
