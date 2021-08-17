import { RYBtoRGB } from "../../src/conversions/ryb";

describe("RYBtoRGB", () => {
  test.each`
    name         | input                               | expected
    ${"Black"}   | ${{ r: 0, y: 0, b: 0, a: 1 }}       | ${{ r: 0, g: 0, b: 0, a: 1 }}
    ${"White"}   | ${{ r: 255, y: 255, b: 255, a: 1 }} | ${{ r: 255, g: 255, b: 255, a: 1 }}
    ${"Red"}     | ${{ r: 255, y: 0, b: 0, a: 1 }}     | ${{ r: 255, g: 0, b: 0, a: 1 }}
    ${"Lime"}    | ${{ r: 0, y: 255, b: 255, a: 1 }}   | ${{ r: 0, g: 255, b: 0, a: 1 }}
    ${"Blue"}    | ${{ r: 0, y: 0, b: 255, a: 1 }}     | ${{ r: 0, g: 0, b: 255, a: 1 }}
    ${"Yellow"}  | ${{ r: 0, y: 255, b: 0, a: 1 }}     | ${{ r: 255, g: 255, b: 0, a: 1 }}
    ${"Cyan"}    | ${{ r: 0, y: 127.5, b: 255, a: 1 }} | ${{ r: 0, g: 255, b: 255, a: 1 }}
    ${"Magenta"} | ${{ r: 255, y: 0, b: 255, a: 1 }}   | ${{ r: 255, g: 0, b: 255, a: 1 }}
    ${"Silver"}  | ${{ r: 192, y: 192, b: 192, a: 1 }} | ${{ r: 192, g: 192, b: 192, a: 1 }}
    ${"Gray"}    | ${{ r: 128, y: 128, b: 128, a: 1 }} | ${{ r: 128, g: 128, b: 128, a: 1 }}
    ${"Maroon"}  | ${{ r: 128, y: 0, b: 0, a: 1 }}     | ${{ r: 128, g: 0, b: 0, a: 1 }}
    ${"Olive"}   | ${{ r: 0, y: 128, b: 0, a: 1 }}     | ${{ r: 128, g: 128, b: 0, a: 1 }}
    ${"Green"}   | ${{ r: 0, y: 128, b: 128, a: 1 }}   | ${{ r: 0, g: 128, b: 0, a: 1 }}
    ${"Purple"}  | ${{ r: 128, y: 0, b: 128, a: 1 }}   | ${{ r: 128, g: 0, b: 128, a: 1 }}
    ${"Teal"}    | ${{ r: 0, y: 64, b: 128, a: 1 }}    | ${{ r: 0, g: 128, b: 128, a: 1 }}
    ${"Navy"}    | ${{ r: 0, y: 0, b: 128, a: 1 }}     | ${{ r: 0, g: 0, b: 128, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RYBtoRGB(input)).toMatchObject(expected);
  });
});
