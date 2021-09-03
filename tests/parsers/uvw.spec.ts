import CM, { extendPlugins } from "../../src/index";
import UVWPlugin from "../../src/plugins/uvw";

extendPlugins([UVWPlugin]);

test("string with percents", () =>
  expect(CM("color(uvwa 50, 46, 108, 80%)").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string without percents", () =>
  expect(CM("color(uvwa 50, 46, 108, 0.8)").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string with /", () => expect(CM("color(uvwa 50.0, 46, 108 / 0.8)").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("color(uvwa 50.0 46 108 0.8)").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("color(uvwa 50.0 46 108 / 0.8)").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("color( uvwa  50.0 46 108 / 0.8 )").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("string with spaces between numbers and with percents (not allowed)", () =>
  expect(CM("color( uvwa  50.0 46 108 / 80% )").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("mixed case", () => expect(CM("CoLoR(UvWa 50.0 46 108 / 0.8 )").stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("alpha > 1", () => expect(CM("color( uvwa  50.0 46 108 / 1.1 )").stringRGB()).toBe("rgba(238, 123, 255, 1)"));
test("alpha = 0", () => expect(CM("color( uvwa  50.0 46 108 / 0 )").stringRGB()).toBe("rgba(238, 123, 255, 0)"));
test("alpha < 0", () => expect(CM("color( uvwa  50.0 46 108 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ u: 50, v: 46, w: 108, a: 0.8 }).stringRGB()).toBe("rgba(238, 123, 255, 0.8)"));
test("object without alpha", () => expect(CM({ u: 50, v: 46, w: 108 }).stringRGB()).toBe("rgba(238, 123, 255, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
