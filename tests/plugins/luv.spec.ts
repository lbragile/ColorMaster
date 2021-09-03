import CM, { ColorMaster, extendPlugins } from "../../src/index";
import LUVPlugin from "../../src/plugins/luv";

extendPlugins([LUVPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringLUV", () => {
  test("luva", () => expect(cm.stringLUV()).toBe("color(luva 66%, 39%, 31%, 0.7)"));
  test("luv", () => expect(cm.stringLUV({ alpha: false })).toBe("color(luv 66%, 39%, 31%)"));
});

test("luva", () =>
  expect(cm.luva()).toStrictEqual({ l: 66.12641911356157, u: 38.78677308184312, v: 30.77549648323262, a: 0.7 }));
