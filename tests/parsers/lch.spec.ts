import CM, { extendPlugins } from "../../src/index";
import LCHPlugin from "../../src/plugins/lch";

extendPlugins([LCHPlugin]);

test("string with percents", () => expect(CM("lcha(50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string without percents", () => expect(CM("lcha(50, 46, 108, 0.8)").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string with /", () => expect(CM("lcha(50.0, 46, 108 / 0.8)").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("lcha(50.0 46 108 0.8)").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("lcha(50.0 46 108 / 0.8)").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("lcha( 50.0 46 108 / 0.8 )").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("lcha( 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("mixed case lcha", () => expect(CM("LcHa( 50.0 46 108 / 0.8 )").stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("high alpha", () => expect(CM("lcha( 50.0 46 108 / 1.1 )").stringRGB()).toBe("rgba(112, 125, 37, 1)"));
test("low alpha", () => expect(CM("lcha( 50.0 46 108 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ l: 50, c: 46, h: 108, a: 0.8 }).stringRGB()).toBe("rgba(112, 125, 37, 0.8)"));
test("object without alpha", () => expect(CM({ l: 50, c: 46, h: 108 }).stringRGB()).toBe("rgba(112, 125, 37, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
