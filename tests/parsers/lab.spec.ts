import CM, { extendPlugins } from "../../src/index";
import LABPlugin from "../../src/plugins/lab";

extendPlugins([LABPlugin]);

test("string with percents", () => expect(CM("laba(50%, 20, 30, 80%)").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string without percents", () => expect(CM("laba(50, 20, 30, 0.8)").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string with /", () => expect(CM("laba(50.0, 20, 30 / 0.8)").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("laba(50.0 20 30 0.8)").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("laba(50.0 20 30 / 0.8)").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("laba( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("laba( 50.0% 20 30 / 80% )").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("mixed case laba", () => expect(CM("lABa( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("high alpha", () => expect(CM("laba( 50.0 20 30 / 1.1 )").stringRGB()).toBe("rgba(161, 105, 69, 1)"));
test("low alpha", () => expect(CM("laba( 50.0 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ l: 50, a: 20, b: 30, alpha: 0.8 }).stringRGB()).toBe("rgba(161, 105, 69, 0.8)"));
test("object without alpha", () => expect(CM({ l: 50, a: 20, b: 30 }).stringRGB()).toBe("rgba(161, 105, 69, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
