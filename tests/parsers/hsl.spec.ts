import CM from "../../src/index";

test("string with percents", () => expect(CM("hsla(50%, 20%, 30%, 80%)").stringHSL()).toBe("hsla(180, 20%, 30%, 0.8)"));
test("string without percents", () =>
  expect(CM("hsla(50.0, 20, 30, 0.8)").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("string with /", () => expect(CM("hsla(50.0, 20, 30 / 0.8)").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("string with spaces between numbers", () =>
  expect(CM("hsla(50.0 20 30 0.8)").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("string with spaces between numbers and /", () =>
  expect(CM("hsla(50.0 20 30 / 0.8)").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("string with spaces between numbers and brackets", () =>
  expect(CM("hsla( 50.0 20 30 / 0.8 )").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("string with spaces between numbers and with percents", () =>
  expect(CM("HsLa( 50.0% 20% 30% / 80% )").stringHSL()).toBe("hsla(180, 20%, 30%, 0.8)"));
test("mixed case hsla", () => expect(CM("HsLa( 50.0 20 30 / 0.8 )").stringHSL()).toBe("hsla(50, 20%, 30%, 0.8)"));
test("high alpha", () => expect(CM("HsLa( 50.0 20 30 / 1.1 )").stringHSL()).toBe("hsla(50, 20%, 30%, 1)"));
test("low alpha", () => expect(CM("HsLa( 50.0 20 30 / -0.1 )").stringHSL()).toBe("hsla(0, 0%, 0%, 1)"));
test("object with alpha", () =>
  expect(CM({ h: 50, s: 100, l: 50, a: 0.8 }).stringHSL()).toBe("hsla(50, 100%, 50%, 0.8)"));
test("object without alpha", () => expect(CM({ h: 50, s: 100, l: 50 }).stringHSL()).toBe("hsla(50, 100%, 50%, 1)"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
test("invalid", () => expect(CM(1).stringRGB()).toBe("rgba(0, 0, 0, 1)"));
