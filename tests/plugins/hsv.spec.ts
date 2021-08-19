import CM, { ColorMaster, extendPlugins } from "../../src/index";
import HSVPlugin from "../../src/plugins/hsv";

extendPlugins([HSVPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringHSV", () => {
  test("hsva", () => expect(cm.stringHSV()).toBe("hsva(30, 50%, 78%, 0.7)"));
  test("hsv", () => expect(cm.stringHSV({ alpha: false })).toBe("hsv(30, 50%, 78%)"));
});

test("hsva", () => expect(cm.hsva()).toStrictEqual({ h: 30.000000000000007, s: 50, v: 78.43137254901961, a: 0.7 }));
