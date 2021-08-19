import CM, { extendPlugins } from "../../src/index";
import XYZPlugin from "../../src/plugins/xyz";

extendPlugins([XYZPlugin]);

test("string with percents", () => expect(CM("xyza(50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string without percents", () => expect(CM("xyza(50, 20, 30, 0.8)").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string with /", () => expect(CM("xyza(50.0, 20, 30 / 0.8)").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("xyza(50.0 20 30 0.8)").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("xyza(50.0 20 30 / 0.8)").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("xyza( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("xyza( 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("mixed case xyza", () => expect(CM("XyZa( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("high alpha", () => expect(CM("xyza( 50.0 20 30 / 1.1 )").stringRGB()).toBe("rgba(255, 0, 172, 1)"));
test("low alpha", () => expect(CM("xyza( 50.0 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () => expect(CM({ x: 50, y: 20, z: 30, a: 0.8 }).stringRGB()).toBe("rgba(255, 0, 172, 0.8)"));
test("object without alpha", () => expect(CM({ x: 50, y: 20, z: 30 }).stringRGB()).toBe("rgba(255, 0, 172, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
