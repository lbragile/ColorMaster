import CM, { extendPlugins } from "../../src/index";
import CMYKPlugin from "../../src/plugins/cmyk";

extendPlugins([CMYKPlugin]);

test("string with percents", () =>
  expect(CM("device-cmyka(50%, 20%, 30%, 70%, 80%)").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string without percents", () =>
  expect(CM("device-cmyka(50, 20, 30, 70, 0.8)").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string with /", () =>
  expect(CM("device-cmyka(50.0, 20, 30, 70 / 0.8)").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("device-cmyka(50.0 20 30 70 0.8)").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("device-cmyka(50.0 20 30 70 / 0.8)").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("device-cmyka( 50.0 20 30 70 / 0.8 )").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("device-cmyka( 50.0% 20% 30% 70% / 80% )").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("mixed case cmyka", () =>
  expect(CM("DevIce-CmYkA( 50.0 20 30 70 / 0.8 )").stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("alpha > 1", () => expect(CM("device-cmyka( 50.0 20 30 70 / 1.1 )").stringRGB()).toBe("rgba(38, 61, 54, 1)"));
test("alpha = 0", () => expect(CM("device-cmyka( 50.0 20 30 70 / 0 )").stringRGB()).toBe("rgba(38, 61, 54, 0)"));
test("alpha < 0", () => expect(CM("device-cmyka( 50.0 20 30 70 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ c: 50, m: 20, y: 30, k: 70, a: 0.8 }).stringRGB()).toBe("rgba(38, 61, 54, 0.8)"));
test("object without alpha", () => expect(CM({ c: 50, m: 20, y: 30, k: 70 }).stringRGB()).toBe("rgba(38, 61, 54, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
