import CM, { extendPlugins } from "../../src/index";
import RYBPlugin from "../../src/plugins/ryb";

extendPlugins([RYBPlugin]);

test("string with percents", () =>
  expect(CM("color(ryba 50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(127, 51, 77, 0.8)"));
test("string without percents", () =>
  expect(CM("color(ryba 127.5, 51, 76.5, 0.8)").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("string with /", () => expect(CM("color(ryba 127.5, 51, 76.5 / 0.8)").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("color(ryba 127.5 51 76.5 0.8)").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("color(ryba 127.5 51 76.5 / 0.8)").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("color( ryba 127.5 51 76.5 / 0.8 )").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("color( ryba 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(127, 51, 77, 0.8)"));
test("mixed case", () => expect(CM("CoLoR(RyBa 127.5 51 76.5 / 0.8 )").stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("alpha > 1", () => expect(CM("color( ryba 127.5 51 76.5 / 1.1 )").stringRGB()).toBe("rgba(128, 51, 77, 1)"));
test("alpha = 0", () => expect(CM("color( ryba 127.5 51 76.5 / 0 )").stringRGB()).toBe("rgba(128, 51, 77, 0)"));
test("alpha < 0", () => expect(CM("color( ryba 127.5 51 76.5 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ r: 127.5, y: 51, b: 76.5, a: 0.8 }).stringRGB()).toBe("rgba(128, 51, 77, 0.8)"));
test("object without alpha", () => expect(CM({ r: 127.5, y: 51, b: 76.5 }).stringRGB()).toBe("rgba(128, 51, 77, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
