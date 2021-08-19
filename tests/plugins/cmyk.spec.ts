import CM, { ColorMaster, extendPlugins } from "../../src/index";
import CMYKPlugin from "../../src/plugins/cmyk";

extendPlugins([CMYKPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringCMYK", () => {
  test("cmyka", () => expect(cm.stringCMYK()).toBe("device-cmyk(0, 25, 50, 22, 0.7)"));
  test("cmyk", () => expect(cm.stringCMYK({ alpha: false })).toBe("device-cmyk(0, 25, 50, 22)"));
});

test("cmyka", () =>
  expect(cm.cmyka()).toStrictEqual({
    c: 0,
    m: 24.999999999999996,
    y: 50.00000000000001,
    k: 21.568627450980394,
    a: 0.7
  }));
