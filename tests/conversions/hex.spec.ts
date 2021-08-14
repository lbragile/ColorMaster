import { HEXtoRGB } from "../../src/conversions/hex";

describe("HEXtoRGB", () => {
  test.each`
    name         | input                                     | expected
    ${"Black"}   | ${{ r: "00", g: "00", b: "00", a: "FF" }} | ${{ r: 0, g: 0, b: 0, a: 1 }}
    ${"White"}   | ${{ r: "FF", g: "FF", b: "FF", a: "FF" }} | ${{ r: 255, g: 255, b: 255, a: 1 }}
    ${"Red"}     | ${{ r: "FF", g: "00", b: "00", a: "FF" }} | ${{ r: 255, g: 0, b: 0, a: 1 }}
    ${"Lime"}    | ${{ r: "00", g: "FF", b: "00", a: "FF" }} | ${{ r: 0, g: 255, b: 0, a: 1 }}
    ${"Blue"}    | ${{ r: "00", g: "00", b: "FF", a: "FF" }} | ${{ r: 0, g: 0, b: 255, a: 1 }}
    ${"Yellow"}  | ${{ r: "FF", g: "FF", b: "00", a: "FF" }} | ${{ r: 255, g: 255, b: 0, a: 1 }}
    ${"Cyan"}    | ${{ r: "00", g: "FF", b: "FF", a: "FF" }} | ${{ r: 0, g: 255, b: 255, a: 1 }}
    ${"Magenta"} | ${{ r: "FF", g: "00", b: "FF", a: "FF" }} | ${{ r: 255, g: 0, b: 255, a: 1 }}
    ${"Silver"}  | ${{ r: "C0", g: "C0", b: "C0", a: "FF" }} | ${{ r: 192, g: 192, b: 192, a: 1 }}
    ${"Gray"}    | ${{ r: "80", g: "80", b: "80", a: "FF" }} | ${{ r: 128, g: 128, b: 128, a: 1 }}
    ${"Maroon"}  | ${{ r: "80", g: "00", b: "00", a: "FF" }} | ${{ r: 128, g: 0, b: 0, a: 1 }}
    ${"Olive"}   | ${{ r: "80", g: "80", b: "00", a: "FF" }} | ${{ r: 128, g: 128, b: 0, a: 1 }}
    ${"Green"}   | ${{ r: "00", g: "80", b: "00", a: "FF" }} | ${{ r: 0, g: 128, b: 0, a: 1 }}
    ${"Purple"}  | ${{ r: "80", g: "00", b: "80", a: "FF" }} | ${{ r: 128, g: 0, b: 128, a: 1 }}
    ${"Teal"}    | ${{ r: "00", g: "80", b: "80", a: "FF" }} | ${{ r: 0, g: 128, b: 128, a: 1 }}
    ${"Navy"}    | ${{ r: "00", g: "00", b: "80", a: "FF" }} | ${{ r: 0, g: 0, b: 128, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(HEXtoRGB(input)).toMatchObject(expected);
  });
});
