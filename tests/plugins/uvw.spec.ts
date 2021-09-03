import CM, { ColorMaster, extendPlugins } from "../../src/index";
import UVWPlugin from "../../src/plugins/uvw";

extendPlugins([UVWPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringUVW", () => {
  test("uvwa", () => expect(cm.stringUVW()).toBe("color(uvwa 26, 35, 40, 0.7)"));
  test("uvw", () => expect(cm.stringUVW({ alpha: false })).toBe("color(uvw 26, 35, 40)"));
});

test("uvwa", () =>
  expect(cm.uvwa()).toStrictEqual({ u: 25.837529475911033, v: 35.48744182188097, w: 40.28571069043561, a: 0.7 }));
