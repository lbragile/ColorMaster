import CM from "../src";
import { BOUNDS } from "../src/enums/bounds";

describe("random generation", () => {
  test("rgb", () => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // red   → 222
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // green → 222
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // blue  → 222
      .mockReturnValueOnce(0.5); // alpha → 0.5

    expect(CM.random().string()).toBe("rgba(222, 222, 222, 0.5)");
  });

  test("hsl", () => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // red   → 222
      .mockReturnValueOnce(192 / BOUNDS.RGB_CHANNEL) // green → 192
      .mockReturnValueOnce(162 / BOUNDS.RGB_CHANNEL) // blue  → 162
      .mockReturnValueOnce(0.5); // alpha → 0.5e

    expect(CM.random().hsl().string({ precision: [0, 1, 1, 1] })).toBe("hsla(30, 47.6%, 75.3%, 0.5)"); // prettier-ignore
  });

  test("hex", () => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // red   → 222
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // green → 222
      .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // blue  → 222
      .mockReturnValueOnce(0.5); // alpha → 0.5

    expect(CM.random().hex().string()).toBe("#DEDEDE80");
  });
});

describe("fromName", () => {
  test("rgb", () => expect(CM.fromName("alice blue").string()).toBe("rgba(240, 248, 255, 1.0)"));
  test("hsl", () => expect(CM.fromName("alice blue").hsl().string({precision: [0, 1, 1, 1]})).toBe("hsla(208, 100.0%, 97.1%, 1.0)")); // prettier-ignore
  test("hex", () => expect(CM.fromName("alice blue").hex().string()).toBe("#F0F8FFFF"));
});
