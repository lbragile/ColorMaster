import CM, { extendPlugins } from "../../src/index";
import HWBPlugin from "../../src/plugins/hwb";

extendPlugins([HWBPlugin]);

test("string with percents", () => expect(CM("hwba(50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(51, 179, 177, 0.8)"));
test("string without percents", () => expect(CM("hwba(180, 20, 30, 0.8)").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("string with /", () => expect(CM("hwba(180, 20, 30 / 0.8)").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("hwba(180 20 30 0.8)").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("hwba(180 20 30 / 0.8)").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("hwba( 180 20 30 / 0.8 )").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("hwba( 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(51, 179, 177, 0.8)"));
test("mixed case hwba", () => expect(CM("HwBa( 180 20 30 / 0.8 )").stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("high alpha", () => expect(CM("hwba( 180 20 30 / 1.1 )").stringRGB()).toBe("rgba(51, 179, 179, 1)"));
test("low alpha", () => expect(CM("hwba( 180 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ h: 180, w: 20, b: 30, a: 0.8 }).stringRGB()).toBe("rgba(51, 179, 179, 0.8)"));
test("object without alpha", () => expect(CM({ h: 180, w: 20, b: 30 }).stringRGB()).toBe("rgba(51, 179, 179, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
