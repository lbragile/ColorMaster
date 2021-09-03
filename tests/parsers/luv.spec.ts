import CM, { extendPlugins } from "../../src/index";
import LUVPlugin from "../../src/plugins/luv";

extendPlugins([LUVPlugin]);

test("string with percents", () =>
  expect(CM("color(luva 50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string without percents", () =>
  expect(CM("color(luva 50, 20, 30, 0.8)").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string with /", () => expect(CM("color(luva 50.0, 20, 30 / 0.8)").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("color(luva 50.0 20 30 0.8)").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("color(luva 50.0 20 30 / 0.8)").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("color( luva  50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("color( luva  50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("mixed case", () => expect(CM("CoLoR(LuVa 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("alpha > 1", () => expect(CM("color( luva  50.0 20 30 / 1.1 )").stringRGB()).toBe("rgba(140, 115, 59, 1)"));
test("alpha = 0", () => expect(CM("color( luva  50.0 20 30 / 0 )").stringRGB()).toBe("rgba(140, 115, 59, 0)"));
test("alpha < 0", () => expect(CM("color( luva  50.0 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ l: 50, u: 20, v: 30, a: 0.8 }).stringRGB()).toBe("rgba(140, 115, 59, 0.8)"));
test("object without alpha", () => expect(CM({ l: 50, u: 20, v: 30 }).stringRGB()).toBe("rgba(140, 115, 59, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
