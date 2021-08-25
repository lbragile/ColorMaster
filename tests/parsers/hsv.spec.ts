import CM, { extendPlugins } from "../../src/index";
import HSVPlugin from "../../src/plugins/hsv";

extendPlugins([HSVPlugin]);

test("string with percents", () => expect(CM("hsva(50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(61, 77, 76, 0.8)"));
test("string without percents", () => expect(CM("hsva(180, 20, 30, 0.8)").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("string with /", () => expect(CM("hsva(180, 20, 30 / 0.8)").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("hsva(180 20 30 0.8)").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("hsva(180 20 30 / 0.8)").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("hsva( 180 20 30 / 0.8 )").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("hsva( 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(61, 77, 76, 0.8)"));
test("mixed case hsva", () => expect(CM("HsVa( 180 20 30 / 0.8 )").stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("alpha > 1", () => expect(CM("hsva( 180 20 30 / 1.1 )").stringRGB()).toBe("rgba(61, 77, 77, 1)"));
test("alpha = 0", () => expect(CM("hsva( 180 20 30 / 0 )").stringRGB()).toBe("rgba(61, 77, 77, 0)"));
test("alpha < 0", () => expect(CM("hsva( 180 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () => expect(CM({ h: 180, s: 20, v: 30, a: 0.8 }).stringRGB()).toBe("rgba(61, 77, 77, 0.8)"));
test("object without alpha", () => expect(CM({ h: 180, s: 20, v: 30 }).stringRGB()).toBe("rgba(61, 77, 77, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
