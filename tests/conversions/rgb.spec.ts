import {
  RGBtoCMYK,
  RGBtoHEX,
  RGBtoHSL,
  RGBtoHSV,
  RGBtoHWB,
  RGBtoLAB,
  RGBtoLCH,
  RGBtoXYZ
} from "../../src/conversions/rgb";

describe("RGBtoHEX", () => {
  test.each`
    name                 | input                               | expected
    ${"Black"}           | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ r: "00", g: "00", b: "00", a: "FF" }}
    ${"White"}           | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ r: "FF", g: "FF", b: "FF", a: "FF" }}
    ${"Red"}             | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ r: "FF", g: "00", b: "00", a: "FF" }}
    ${"Lime"}            | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ r: "00", g: "FF", b: "00", a: "FF" }}
    ${"Blue"}            | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ r: "00", g: "00", b: "FF", a: "FF" }}
    ${"Yellow"}          | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ r: "FF", g: "FF", b: "00", a: "FF" }}
    ${"Cyan"}            | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ r: "00", g: "FF", b: "FF", a: "FF" }}
    ${"Magenta"}         | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ r: "FF", g: "00", b: "FF", a: "FF" }}
    ${"Silver"}          | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ r: "C0", g: "C0", b: "C0", a: "FF" }}
    ${"Gray"}            | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ r: "80", g: "80", b: "80", a: "FF" }}
    ${"Maroon"}          | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ r: "80", g: "00", b: "00", a: "FF" }}
    ${"Olive"}           | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ r: "80", g: "80", b: "00", a: "FF" }}
    ${"Green"}           | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ r: "00", g: "80", b: "00", a: "FF" }}
    ${"Purple"}          | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ r: "80", g: "00", b: "80", a: "FF" }}
    ${"Teal"}            | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ r: "00", g: "80", b: "80", a: "FF" }}
    ${"Navy"}            | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ r: "00", g: "00", b: "80", a: "FF" }}
    ${"undefined alpha"} | ${{ r: 0, g: 0, b: 128 }}           | ${{ r: "00", g: "00", b: "80", a: "FF" }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoHEX(input)).toMatchObject(expected);
  });
});

describe("RGBtoHSL", () => {
  test.each`
    name                 | input                               | expected
    ${"Black"}           | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ h: 0, s: 0, l: 0, a: 1 }}
    ${"White"}           | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ h: 0, s: 0, l: 100, a: 1 }}
    ${"Red"}             | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ h: 0, s: 100, l: 50, a: 1 }}
    ${"Lime"}            | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ h: 120, s: 100, l: 50, a: 1 }}
    ${"Blue"}            | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ h: 240, s: 100, l: 50, a: 1 }}
    ${"Yellow"}          | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ h: 60, s: 100, l: 50, a: 1 }}
    ${"Cyan"}            | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ h: 180, s: 100, l: 50, a: 1 }}
    ${"Magenta"}         | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ h: 300, s: 100, l: 50, a: 1 }}
    ${"Silver"}          | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ h: 0, s: 0, l: 75.29411764705883, a: 1 }}
    ${"Gray"}            | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ h: 0, s: 0, l: 50.19607843137255, a: 1 }}
    ${"Maroon"}          | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ h: 0, s: 100, l: 25.098039215686274, a: 1 }}
    ${"Olive"}           | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ h: 60, s: 100, l: 25.098039215686274, a: 1 }}
    ${"Green"}           | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ h: 120, s: 100, l: 25.098039215686274, a: 1 }}
    ${"Purple"}          | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ h: 300, s: 100, l: 25.098039215686274, a: 1 }}
    ${"Teal"}            | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ h: 180, s: 100, l: 25.098039215686274, a: 1 }}
    ${"Navy"}            | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ h: 240, s: 100, l: 25.098039215686274, a: 1 }}
    ${"undefined alpha"} | ${{ r: 0, g: 0, b: 128 }}           | ${{ h: 240, s: 100, l: 25.098039215686274, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoHSL(input)).toMatchObject(expected);
  });
});

describe("RGBtoHSV", () => {
  test.each`
    name                 | input                               | expected
    ${"Black"}           | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ h: 0, s: 0, v: 0, a: 1 }}
    ${"White"}           | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ h: 0, s: 0, v: 100, a: 1 }}
    ${"Red"}             | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ h: 0, s: 100, v: 100, a: 1 }}
    ${"Lime"}            | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ h: 120, s: 100, v: 100, a: 1 }}
    ${"Blue"}            | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ h: 240, s: 100, v: 100, a: 1 }}
    ${"Yellow"}          | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ h: 60, s: 100, v: 100, a: 1 }}
    ${"Cyan"}            | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ h: 180, s: 100, v: 100, a: 1 }}
    ${"Magenta"}         | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ h: 300, s: 100, v: 100, a: 1 }}
    ${"Silver"}          | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ h: 0, s: 0, v: 75.29411764705883, a: 1 }}
    ${"Gray"}            | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ h: 0, s: 0, v: 50.19607843137255, a: 1 }}
    ${"Maroon"}          | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ h: 0, s: 100, v: 50.19607843137255, a: 1 }}
    ${"Olive"}           | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ h: 60, s: 100, v: 50.19607843137255, a: 1 }}
    ${"Green"}           | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ h: 120, s: 100, v: 50.19607843137255, a: 1 }}
    ${"Purple"}          | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ h: 300, s: 100, v: 50.19607843137255, a: 1 }}
    ${"Teal"}            | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ h: 180, s: 100, v: 50.19607843137255, a: 1 }}
    ${"Navy"}            | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ h: 240, s: 100, v: 50.19607843137255, a: 1 }}
    ${"undefined alpha"} | ${{ r: 0, g: 0, b: 128 }}           | ${{ h: 240, s: 100, v: 50.19607843137255, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoHSV(input)).toMatchObject(expected);
  });
});

describe("RGBtoHWB", () => {
  test.each`
    name                 | input                               | expected
    ${"Black"}           | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ h: 0, w: 0, b: 100, a: 1 }}
    ${"White"}           | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ h: 0, w: 100, b: 0, a: 1 }}
    ${"Red"}             | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ h: 0, w: 0, b: 0, a: 1 }}
    ${"Lime"}            | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ h: 120, w: 0, b: 0, a: 1 }}
    ${"Blue"}            | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ h: 240, w: 0, b: 0, a: 1 }}
    ${"Yellow"}          | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ h: 60, w: 0, b: 0, a: 1 }}
    ${"Cyan"}            | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ h: 180, w: 0, b: 0, a: 1 }}
    ${"Magenta"}         | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ h: 300, w: 0, b: 0, a: 1 }}
    ${"Silver"}          | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ h: 0, w: 75.29411764705883, b: 24.705882352941178, a: 1 }}
    ${"Gray"}            | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ h: 0, w: 50.196078431372555, b: 49.80392156862745, a: 1 }}
    ${"Maroon"}          | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ h: 0, w: 0, b: 49.80392156862745, a: 1 }}
    ${"Olive"}           | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ h: 60, w: 0, b: 49.80392156862745, a: 1 }}
    ${"Green"}           | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ h: 120, w: 0, b: 49.80392156862745, a: 1 }}
    ${"Purple"}          | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ h: 300, w: 0, b: 49.80392156862745, a: 1 }}
    ${"Teal"}            | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ h: 180, w: 0, b: 49.80392156862745, a: 1 }}
    ${"Navy"}            | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ h: 240, w: 0, b: 49.80392156862745, a: 1 }}
    ${"undefined alpha"} | ${{ r: 0, g: 0, b: 128 }}           | ${{ h: 240, w: 0, b: 49.80392156862745, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoHWB(input)).toMatchObject(expected);
  });
});

describe("RGBtoXYZ", () => {
  test.each`
    name         | input                               | expected
    ${"Black"}   | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ x: 0, y: 0, z: 0, a: 1 }}
    ${"White"}   | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ x: 96.42956660812443, y: 100.00000361162846, z: 82.51045485672053, a: 1 }}
    ${"Red"}     | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ x: 43.606574282481105, y: 22.249319175623715, z: 1.392390450094348, a: 1 }}
    ${"Lime"}    | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ x: 38.51514688337913, y: 71.68870538238822, z: 9.708128566574631, a: 1 }}
    ${"Blue"}    | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ x: 14.307845442264197, y: 6.06197905361654, z: 71.40993584005156, a: 1 }}
    ${"Yellow"}  | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ x: 82.12172116586024, y: 93.93802455801192, z: 11.100519016668978, a: 1 }}
    ${"Cyan"}    | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ x: 52.82299232564333, y: 77.75068443600475, z: 81.11806440662619, a: 1 }}
    ${"Magenta"} | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ x: 57.9144197247453, y: 28.311298229240254, z: 72.8023262901459, a: 1 }}
    ${"Silver"}  | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ x: 50.82948312439858, y: 52.71151447432529, z: 43.49250878384406, a: 1 }}
    ${"Gray"}    | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ x: 20.815334473796298, y: 21.58605079099785, z: 17.810748049997, a: 1 }}
    ${"Maroon"}  | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ x: 9.412936932870265, y: 4.802749164443903, z: 0.30056209891118324, a: 1 }}
    ${"Olive"}   | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ x: 17.72683580107677, y: 20.2775089608042, z: 2.3961635864620145, a: 1 }}
    ${"Green"}   | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ x: 8.313898868206506, y: 15.474759796360301, z: 2.0956014875508315, a: 1 }}
    ${"Purple"}  | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ x: 12.501435605589789, y: 6.11129099463755, z: 15.715146562446167, a: 1 }}
    ${"Teal"}    | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ x: 11.402397540926028, y: 16.783301626553946, z: 17.510185951085816, a: 1 }}
    ${"Navy"}    | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ x: 3.088498672719523, y: 1.308541830193648, z: 15.414584463534982, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoXYZ(input)).toMatchObject(expected);
  });
});

describe("RGBtoLAB", () => {
  test.each`
    name         | input                               | expected
    ${"Black"}   | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ l: 0, a: 0, b: 0, alpha: 1 }}
    ${"White"}   | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ l: 100.00000139649632, a: 0.013072617939369202, b: 0.008521930047722392, alpha: 1 }}
    ${"Red"}     | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ l: 54.29054294696968, a: 80.81496038295182, b: 69.89317238162293, alpha: 1 }}
    ${"Lime"}    | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ l: 87.818536331152, a: -79.2614492214136, b: 80.99877040443191, alpha: 1 }}
    ${"Blue"}    | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ l: 29.56829715344471, a: 68.29433149454636, b: -112.02160321595204, alpha: 1 }}
    ${"Yellow"}  | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ l: 97.60701009682252, a: -15.737448081738215, b: 93.39797483583389, alpha: 1 }}
    ${"Cyan"}    | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ l: 90.66601315791455, a: -50.64580808615321, b: -14.953199632638414, alpha: 1 }}
    ${"Magenta"} | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ l: 60.16894098715946, a: 93.55063152191018, b: -60.49263514602645, alpha: 1 }}
    ${"Silver"}  | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ l: 77.7043647180372, a: 0.010560011590166063, b: 0.006883983031724661, alpha: 1 }}
    ${"Gray"}    | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ l: 53.5850142898864, a: 0.007841881854875332, b: 0.005112057043210605, alpha: 1 }}
    ${"Maroon"}  | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ l: 26.165244625216815, a: 48.47853539124311, b: 39.440023855244455, alpha: 1 }}
    ${"Olive"}   | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ l: 52.14952867110431, a: -9.44043565922903, b: 56.02671840824869, alpha: 1 }}
    ${"Green"}   | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ l: 46.27770902748027, a: -47.546629399228294, b: 48.58879765690989, alpha: 1 }}
    ${"Purple"}  | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ l: 29.6915239933531, a: 56.11829269750887, b: -36.28776577925347, alpha: 1 }}
    ${"Teal"}    | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ l: 47.98582724554071, a: -30.38094169802538, b: -8.969987910259603, alpha: 1 }}
    ${"Navy"}    | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ l: 11.33509112426626, a: 40.96777565305946, b: -67.1984893682376, alpha: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoLAB(input)).toMatchObject(expected);
  });
});

describe("RGBtoLCH", () => {
  test.each`
    name         | input                               | expected
    ${"Black"}   | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ l: 0, c: 0, h: 0, a: 1 }}
    ${"White"}   | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ l: 100.00000139649632, c: 0.015605019433726806, h: 33.09999269502754, a: 1 }}
    ${"Red"}     | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ l: 54.29054294696968, c: 106.84621363092532, h: 40.85503255301534, a: 1 }}
    ${"Lime"}    | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ l: 87.818536331152, c: 113.32774655709255, h: 134.37890218408188, a: 1 }}
    ${"Blue"}    | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ l: 29.56829715344471, c: 131.19815281229833, h: 301.36870822201354, a: 1 }}
    ${"Yellow"}  | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ l: 97.60701009682252, c: 94.71456580463465, h: 99.5644289844475, a: 1 }}
    ${"Cyan"}    | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ l: 90.66601315791455, c: 52.80715913541458, h: 196.44926133126648, a: 1 }}
    ${"Magenta"} | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ l: 60.16894098715946, c: 111.40502486449383, h: 327.1120833575584, a: 1 }}
    ${"Silver"}  | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ l: 77.7043647180372, c: 0.012605675990025867, h: 33.099992695116114, a: 1 }}
    ${"Gray"}    | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ l: 53.5850142898864, c: 0.009360995579470281, h: 33.09999269518542, a: 1 }}
    ${"Maroon"}  | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ l: 26.165244625216815, c: 62.495470838951704, h: 39.130299615431724, a: 1 }}
    ${"Olive"}   | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ l: 52.14952867110431, c: 56.81650289337804, h: 99.5644289844475, a: 1 }}
    ${"Green"}   | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ l: 46.27770902748027, c: 67.98200662654563, h: 134.37890218408188, a: 1 }}
    ${"Purple"}  | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ l: 29.6915239933531, c: 66.8286220158192, h: 327.1120833575584, a: 1 }}
    ${"Teal"}    | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ l: 47.98582724554071, c: 31.677473093178072, h: 196.44926133126648, a: 1 }}
    ${"Navy"}    | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ l: 11.33509112426626, c: 78.7019416236509, h: 301.36870822201354, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoLCH(input)).toMatchObject(expected);
  });
});

describe("RGBtoCMYK", () => {
  test.each`
    name         | input                               | expected
    ${"Black"}   | ${{ r: 0, g: 0, b: 0, a: 1 }}       | ${{ c: 0, m: 0, y: 0, k: 100, a: 1 }}
    ${"White"}   | ${{ r: 255, g: 255, b: 255, a: 1 }} | ${{ c: 0, m: 0, y: 0, k: 0, a: 1 }}
    ${"Red"}     | ${{ r: 255, g: 0, b: 0, a: 1 }}     | ${{ c: 0, m: 100, y: 100, k: 0, a: 1 }}
    ${"Lime"}    | ${{ r: 0, g: 255, b: 0, a: 1 }}     | ${{ c: 100, m: 0, y: 100, k: 0, a: 1 }}
    ${"Blue"}    | ${{ r: 0, g: 0, b: 255, a: 1 }}     | ${{ c: 100, m: 100, y: 0, k: 0, a: 1 }}
    ${"Yellow"}  | ${{ r: 255, g: 255, b: 0, a: 1 }}   | ${{ c: 0, m: 0, y: 100, k: 0, a: 1 }}
    ${"Cyan"}    | ${{ r: 0, g: 255, b: 255, a: 1 }}   | ${{ c: 100, m: 0, y: 0, k: 0, a: 1 }}
    ${"Magenta"} | ${{ r: 255, g: 0, b: 255, a: 1 }}   | ${{ c: 0, m: 100, y: 0, k: 0, a: 1 }}
    ${"Silver"}  | ${{ r: 192, g: 192, b: 192, a: 1 }} | ${{ c: 0, m: 0, y: 0, k: 24.705882352941178, a: 1 }}
    ${"Gray"}    | ${{ r: 128, g: 128, b: 128, a: 1 }} | ${{ c: 0, m: 0, y: 0, k: 49.80392156862745, a: 1 }}
    ${"Maroon"}  | ${{ r: 128, g: 0, b: 0, a: 1 }}     | ${{ c: 0, m: 100, y: 100, k: 49.80392156862745, a: 1 }}
    ${"Olive"}   | ${{ r: 128, g: 128, b: 0, a: 1 }}   | ${{ c: 0, m: 0, y: 100, k: 49.80392156862745, a: 1 }}
    ${"Green"}   | ${{ r: 0, g: 128, b: 0, a: 1 }}     | ${{ c: 100, m: 0, y: 100, k: 49.80392156862745, a: 1 }}
    ${"Purple"}  | ${{ r: 128, g: 0, b: 128, a: 1 }}   | ${{ c: 0, m: 100, y: 0, k: 49.80392156862745, a: 1 }}
    ${"Teal"}    | ${{ r: 0, g: 128, b: 128, a: 1 }}   | ${{ c: 100, m: 0, y: 0, k: 49.80392156862745, a: 1 }}
    ${"Navy"}    | ${{ r: 0, g: 0, b: 128, a: 1 }}     | ${{ c: 100, m: 100, y: 0, k: 49.80392156862745, a: 1 }}
  `("$name", ({ input, expected }) => {
    expect(RGBtoCMYK(input)).toMatchObject(expected);
  });
});
