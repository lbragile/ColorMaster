import { HSLtoRGB } from "../../src/conversions/hsl";

describe("HSLtoRGB", () => {
  test.each`
    name                 | input                                              | expected
    ${"Black"}           | ${{ h: 0, s: 0, l: 0, a: 1 }}                      | ${{ r: 0, g: 0, b: 0, a: 1 }}
    ${"White"}           | ${{ h: 0, s: 0, l: 100, a: 1 }}                    | ${{ r: 255, g: 255, b: 255, a: 1 }}
    ${"Red"}             | ${{ h: 0, s: 100, l: 50, a: 1 }}                   | ${{ r: 255, g: 0, b: 0, a: 1 }}
    ${"Lime"}            | ${{ h: 120, s: 100, l: 50, a: 1 }}                 | ${{ r: 0, g: 255, b: 0, a: 1 }}
    ${"Blue"}            | ${{ h: 240, s: 100, l: 50, a: 1 }}                 | ${{ r: 0, g: 0, b: 255, a: 1 }}
    ${"Yellow"}          | ${{ h: 60, s: 100, l: 50, a: 1 }}                  | ${{ r: 255, g: 255, b: 0, a: 1 }}
    ${"Cyan"}            | ${{ h: 180, s: 100, l: 50, a: 1 }}                 | ${{ r: 0, g: 255, b: 255, a: 1 }}
    ${"Magenta"}         | ${{ h: 300, s: 100, l: 50, a: 1 }}                 | ${{ r: 255, g: 0, b: 255, a: 1 }}
    ${"Silver"}          | ${{ h: 0, s: 0, l: 75.29411764705883, a: 1 }}      | ${{ r: 192, g: 192, b: 192, a: 1 }}
    ${"Gray"}            | ${{ h: 0, s: 0, l: 50.19607843137255, a: 1 }}      | ${{ r: 128, g: 128, b: 128, a: 1 }}
    ${"Maroon"}          | ${{ h: 0, s: 100, l: 25.098039215686274, a: 1 }}   | ${{ r: 128, g: 0, b: 0, a: 1 }}
    ${"Olive"}           | ${{ h: 60, s: 100, l: 25.098039215686274, a: 1 }}  | ${{ r: 128, g: 128, b: 0, a: 1 }}
    ${"Green"}           | ${{ h: 120, s: 100, l: 25.098039215686274, a: 1 }} | ${{ r: 0, g: 128, b: 0, a: 1 }}
    ${"Purple"}          | ${{ h: 300, s: 100, l: 25.098039215686274, a: 1 }} | ${{ r: 128, g: 0, b: 128, a: 1 }}
    ${"Teal"}            | ${{ h: 180, s: 100, l: 25.098039215686274, a: 1 }} | ${{ r: 0, g: 128, b: 128, a: 1 }}
    ${"Navy"}            | ${{ h: 240, s: 100, l: 25.098039215686274, a: 1 }} | ${{ r: 0, g: 0, b: 128, a: 1 }}
    ${"undefined alpha"} | ${{ h: 240, s: 100, l: 25.098039215686274 }}       | ${{ r: 0, g: 0, b: 128, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(HSLtoRGB(input)).toMatchObject(expected);
  });
});