import CM, { extendPlugins } from "../../src/index";
import XYZPlugin from "../../src/plugins/xyz";

extendPlugins([XYZPlugin]);

test("string with percents (invalid in xyz space)", () =>
  expect(CM("color(xyza 50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("string without percents", () =>
  expect(CM("color(xyza 0.5, 0.2, 0.3, 0.8)").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("string with /", () => expect(CM("color(xyza 0.5, 0.2, 0.3 / 0.8)").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("color(xyza 0.5 0.2 0.3 80%)").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("color(xyza 0.5 0.2 0.3 / 0.8)").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("color(xyza 0.5 0.2 0.3 / 0.8 )").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("string with spaces between numbers and with percents (invalid in xyz space)", () =>
  expect(CM("color(xyza 50% 20% 30% / 80% )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("mixed case", () => expect(CM("CoLOr(XyZa 0.5 0.2 0.3 / 0.8 )").stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("alpha > 0", () => expect(CM("color(xyza 0.5 0.2 0.3 / 1.1 )").stringRGB()).toBe("rgba(27, 0, 13, 1)"));
test("alpha = 0", () => expect(CM("color(xyza 0.5 .2 .3 / 0)").stringRGB()).toBe("rgba(27, 0, 13, 0)"));
test("alpha < 0", () => expect(CM("color(xyza 0.5 0.2 0.3 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ x: 0.5, y: 0.2, z: 0.3, a: 0.8 }).stringRGB()).toBe("rgba(27, 0, 13, 0.8)"));
test("object without alpha", () => expect(CM({ x: 0.5, y: 0.2, z: 0.3 }).stringRGB()).toBe("rgba(27, 0, 13, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
