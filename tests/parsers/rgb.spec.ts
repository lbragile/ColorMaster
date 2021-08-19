import CM from "../../src/index";

test("string with percents", () => expect(CM("rgba(50%, 20%, 30%, 80%)").stringRGB()).toBe("rgba(127, 51, 77, 0.8)"));
test("string without percents", () => expect(CM("rgba(50, 20, 30, 0.8)").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("string with /", () => expect(CM("rgba(50.0, 20, 30 / 0.8)").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("rgba(50.0 20 30 0.8)").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("rgba(50.0 20 30 / 0.8)").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("rgba( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("rgba( 50.0% 20% 30% / 80% )").stringRGB()).toBe("rgba(127, 51, 77, 0.8)"));
test("mixed case rgba", () => expect(CM("RgBa( 50.0 20 30 / 0.8 )").stringRGB()).toBe("rgba(50, 20, 30, 0.8)"));
test("high alpha", () => expect(CM("rgba( 50.0 20 30 / 1.1 )").stringRGB()).toBe("rgba(50, 20, 30, 1)"));
test("low alpha", () => expect(CM("rgba( 50.0 20 30 / -0.1 )").stringRGB()).toBe("rgba(0, 0, 0, 1)"));
test("object with alpha", () =>
  expect(CM({ r: 200, g: 150, b: 100, a: 0.8 }).stringRGB()).toBe("rgba(200, 150, 100, 0.8)"));
test("object without alpha", () => expect(CM({ r: 200, g: 150, b: 100 }).stringRGB()).toBe("rgba(200, 150, 100, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
