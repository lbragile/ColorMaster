import { ColorMaster } from "../src/colormaster";

describe("String Formation", () => {
  it("rgb", () => {
    expect(new ColorMaster({ r: 100, g: 90, b: 80, a: 0.5 }).stringRGB()).toBe("rgba(100, 90, 80, 0.5)");
  });
});
