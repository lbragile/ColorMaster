import CM, { ColorMaster, extendPlugins } from "../../src/index";
import XYZPlugin from "../../src/plugins/xyz";

extendPlugins([XYZPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringXYZ", () => {
  test("xyza", () => expect(cm.stringXYZ()).toBe("color(xyza 39, 35, 13, 0.7)"));
  test("xyz", () => expect(cm.stringXYZ({ alpha: false })).toBe("color(xyz 39, 35, 13)"));
});

test("xyza", () =>
  expect(cm.xyza()).toStrictEqual({ x: 38.75629421386655, y: 35.48744182188097, z: 12.865390129094843, a: 0.7 }));
