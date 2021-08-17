type THue =
  | "red"
  | "orange"
  | "yellow"
  | "lime green"
  | "green"
  | "blue green"
  | "cyan"
  | "sky blue"
  | "blue"
  | "purple"
  | "magenta"
  | "pink";

export type TCSSName =
  | "maroon"
  | "dark red"
  | "brown"
  | "firebrick"
  | "crimson"
  | "red"
  | "tomato"
  | "coral"
  | "indian red"
  | "light coral"
  | "dark salmon"
  | "salmon"
  | "light salmon"
  | "orange red"
  | "dark orange"
  | "orange"
  | "gold"
  | "dark golden rod"
  | "golden rod"
  | "pale golden rod"
  | "dark khaki"
  | "khaki"
  | "olive"
  | "yellow"
  | "yellow green"
  | "dark olive green"
  | "olive drab"
  | "lawn green"
  | "chart reuse"
  | "green yellow"
  | "dark green"
  | "green"
  | "forest green"
  | "lime"
  | "lime green"
  | "light green"
  | "pale green"
  | "dark sea green"
  | "medium spring green"
  | "spring green"
  | "sea green"
  | "medium aqua marine"
  | "medium sea green"
  | "light sea green"
  | "dark slate gray"
  | "teal"
  | "dark cyan"
  | "cyan"
  | "aqua"
  | "light cyan"
  | "dark turquoise"
  | "turquoise"
  | "medium turquoise"
  | "pale turquoise"
  | "aqua marine"
  | "powder blue"
  | "cadet blue"
  | "steel blue"
  | "corn flower blue"
  | "deep sky blue"
  | "dodger blue"
  | "light blue"
  | "sky blue"
  | "light sky blue"
  | "midnight blue"
  | "navy"
  | "dark blue"
  | "medium blue"
  | "blue"
  | "royal blue"
  | "blue violet"
  | "indigo"
  | "dark slate blue"
  | "slate blue"
  | "medium slate blue"
  | "medium purple"
  | "dark magenta"
  | "dark violet"
  | "dark orchid"
  | "medium orchid"
  | "purple"
  | "thistle"
  | "plum"
  | "violet"
  | "magenta"
  | "fuchsia"
  | "orchid"
  | "medium violet red"
  | "pale violet red"
  | "deep pink"
  | "hot pink"
  | "light pink"
  | "pink"
  | "antique white"
  | "beige"
  | "bisque"
  | "blanched almond"
  | "wheat"
  | "corn silk"
  | "lemon chiffon"
  | "light golden rod yellow"
  | "light yellow"
  | "saddle brown"
  | "sienna"
  | "chocolate"
  | "peru"
  | "sandy brown"
  | "burly wood"
  | "tan"
  | "rosy brown"
  | "moccasin"
  | "navajo white"
  | "peach puff"
  | "misty rose"
  | "lavender blush"
  | "linen"
  | "old lace"
  | "papaya whip"
  | "sea shell"
  | "mint cream"
  | "slate gray"
  | "light slate gray"
  | "light steel blue"
  | "lavender"
  | "floral white"
  | "alice blue"
  | "ghost white"
  | "honeydew"
  | "ivory"
  | "azure"
  | "snow"
  | "black"
  | "dim gray"
  | "dim grey"
  | "gray"
  | "grey"
  | "dark gray"
  | "dark grey"
  | "silver"
  | "light gray"
  | "light grey"
  | "gainsboro"
  | "gainsborough"
  | "white smoke"
  | "white"
  | "transparent";

// Obtained from https://www.canva.com/colors/color-wheel/
// names are given to follow the predominant colors on the color wheel:
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#fully_saturated_colors
export const HueColors: Record<THue, string> = {
  red         : "hsl(0, 100%, 50%)",
  orange      : "hsl(30, 100%, 50%)",
  yellow      : "hsl(60, 100%, 50%)",
  "lime green": "hsl(90, 100%, 50%)",
  green       : "hsl(120, 100%, 50%)",
  "blue green": "hsl(150, 100%, 50%)",
  cyan        : "hsl(180, 100%, 50%)",
  "sky blue"  : "hsl(210, 100%, 50%)",
  blue        : "hsl(240, 100%, 50%)",
  purple      : "hsl(270, 100%, 50%)",
  magenta     : "hsl(300, 100%, 50%)",
  pink        : "hsl(330, 100%, 50%)"
};

// Obtained from https://www.rapidtables.com/web/color/RGB_Color.html
export const RGBExtended: Record<TCSSName, string> = {
  maroon                   : "rgb(128,0,0)",
  "dark red"               : "rgb(139,0,0)",
  brown                    : "rgb(165,42,42)",
  firebrick                : "rgb(178,34,34)",
  crimson                  : "rgb(220,20,60)",
  red                      : "rgb(255,0,0)",
  tomato                   : "rgb(255,99,71)",
  coral                    : "rgb(255,127,80)",
  "indian red"             : "rgb(205,92,92)",
  "light coral"            : "rgb(240,128,128)",
  "dark salmon"            : "rgb(233,150,122)",
  salmon                   : "rgb(250,128,114)",
  "light salmon"           : "rgb(255,160,122)",
  "orange red"             : "rgb(255,69,0)",
  "dark orange"            : "rgb(255,140,0)",
  orange                   : "rgb(255,165,0)",
  gold                     : "rgb(255,215,0)",
  "dark golden rod"        : "rgb(184,134,11)",
  "golden rod"             : "rgb(218,165,32)",
  "pale golden rod"        : "rgb(238,232,170)",
  "dark khaki"             : "rgb(189,183,107)",
  khaki                    : "rgb(240,230,140)",
  olive                    : "rgb(128,128,0)",
  yellow                   : "rgb(255,255,0)",
  "yellow green"           : "rgb(154,205,50)",
  "dark olive green"       : "rgb(85,107,47)",
  "olive drab"             : "rgb(107,142,35)",
  "lawn green"             : "rgb(124,252,0)",
  "chart reuse"            : "rgb(127,255,0)",
  "green yellow"           : "rgb(173,255,47)",
  "dark green"             : "rgb(0,100,0)",
  green                    : "rgb(0,128,0)",
  "forest green"           : "rgb(34,139,34)",
  lime                     : "rgb(0,255,0)",
  "lime green"             : "rgb(50,205,50)",
  "light green"            : "rgb(144,238,144)",
  "pale green"             : "rgb(152,251,152)",
  "dark sea green"         : "rgb(143,188,143)",
  "medium spring green"    : "rgb(0,250,154)",
  "spring green"           : "rgb(0,255,127)",
  "sea green"              : "rgb(46,139,87)",
  "medium aqua marine"     : "rgb(102,205,170)",
  "medium sea green"       : "rgb(60,179,113)",
  "light sea green"        : "rgb(32,178,170)",
  "dark slate gray"        : "rgb(47,79,79)",
  teal                     : "rgb(0,128,128)",
  "dark cyan"              : "rgb(0,139,139)",
  cyan                     : "rgb(0,255,255)",
  aqua                     : "rgb(0,255,255)",
  "light cyan"             : "rgb(224,255,255)",
  "dark turquoise"         : "rgb(0,206,209)",
  turquoise                : "rgb(64,224,208)",
  "medium turquoise"       : "rgb(72,209,204)",
  "pale turquoise"         : "rgb(175,238,238)",
  "aqua marine"            : "rgb(127,255,212)",
  "powder blue"            : "rgb(176,224,230)",
  "cadet blue"             : "rgb(95,158,160)",
  "steel blue"             : "rgb(70,130,180)",
  "corn flower blue"       : "rgb(100,149,237)",
  "deep sky blue"          : "rgb(0,191,255)",
  "dodger blue"            : "rgb(30,144,255)",
  "light blue"             : "rgb(173,216,230)",
  "sky blue"               : "rgb(135,206,235)",
  "light sky blue"         : "rgb(135,206,250)",
  "midnight blue"          : "rgb(25,25,112)",
  navy                     : "rgb(0,0,128)",
  "dark blue"              : "rgb(0,0,139)",
  "medium blue"            : "rgb(0,0,205)",
  blue                     : "rgb(0,0,255)",
  "royal blue"             : "rgb(65,105,225)",
  "blue violet"            : "rgb(138,43,226)",
  indigo                   : "rgb(75,0,130)",
  "dark slate blue"        : "rgb(72,61,139)",
  "slate blue"             : "rgb(106,90,205)",
  "medium slate blue"      : "rgb(123,104,238)",
  "medium purple"          : "rgb(147,112,219)",
  "dark magenta"           : "rgb(139,0,139)",
  "dark violet"            : "rgb(148,0,211)",
  "dark orchid"            : "rgb(153,50,204)",
  "medium orchid"          : "rgb(186,85,211)",
  purple                   : "rgb(128,0,128)",
  thistle                  : "rgb(216,191,216)",
  plum                     : "rgb(221,160,221)",
  violet                   : "rgb(238,130,238)",
  magenta                  : "rgb(255,0,255)",
  fuchsia                  : "rgb(255,0,255)",
  orchid                   : "rgb(218,112,214)",
  "medium violet red"      : "rgb(199,21,133)",
  "pale violet red"        : "rgb(219,112,147)",
  "deep pink"              : "rgb(255,20,147)",
  "hot pink"               : "rgb(255,105,180)",
  "light pink"             : "rgb(255,182,193)",
  pink                     : "rgb(255,192,203)",
  "antique white"          : "rgb(250,235,215)",
  beige                    : "rgb(245,245,220)",
  bisque                   : "rgb(255,228,196)",
  "blanched almond"        : "rgb(255,235,205)",
  wheat                    : "rgb(245,222,179)",
  "corn silk"              : "rgb(255,248,220)",
  "lemon chiffon"          : "rgb(255,250,205)",
  "light golden rod yellow": "rgb(250,250,210)",
  "light yellow"           : "rgb(255,255,224)",
  "saddle brown"           : "rgb(139,69,19)",
  sienna                   : "rgb(160,82,45)",
  chocolate                : "rgb(210,105,30)",
  peru                     : "rgb(205,133,63)",
  "sandy brown"            : "rgb(244,164,96)",
  "burly wood"             : "rgb(222,184,135)",
  tan                      : "rgb(210,180,140)",
  "rosy brown"             : "rgb(188,143,143)",
  moccasin                 : "rgb(255,228,181)",
  "navajo white"           : "rgb(255,222,173)",
  "peach puff"             : "rgb(255,218,185)",
  "misty rose"             : "rgb(255,228,225)",
  "lavender blush"         : "rgb(255,240,245)",
  linen                    : "rgb(250,240,230)",
  "old lace"               : "rgb(253,245,230)",
  "papaya whip"            : "rgb(255,239,213)",
  "sea shell"              : "rgb(255,245,238)",
  "mint cream"             : "rgb(245,255,250)",
  "slate gray"             : "rgb(112,128,144)",
  "light slate gray"       : "rgb(119,136,153)",
  "light steel blue"       : "rgb(176,196,222)",
  lavender                 : "rgb(230,230,250)",
  "floral white"           : "rgb(255,250,240)",
  "alice blue"             : "rgb(240,248,255)",
  "ghost white"            : "rgb(248,248,255)",
  honeydew                 : "rgb(240,255,240)",
  ivory                    : "rgb(255,255,240)",
  azure                    : "rgb(240,255,255)",
  snow                     : "rgb(255,250,250)",
  black                    : "rgb(0,0,0)",
  "dim gray"               : "rgb(105,105,105)",
  "dim grey"               : "rgb(105,105,105)",
  gray                     : "rgb(128,128,128)",
  grey                     : "rgb(128,128,128)",
  "dark gray"              : "rgb(169,169,169)",
  "dark grey"              : "rgb(169,169,169)",
  silver                   : "rgb(192,192,192)",
  "light gray"             : "rgb(211,211,211)",
  "light grey"             : "rgb(211,211,211)",
  gainsboro                : "rgb(220,220,220)",
  gainsborough             : "rgb(220,220,220)",
  "white smoke"            : "rgb(245,245,245)",
  white                    : "rgb(255,255,255)",
  "transparent"            : "rgba(0,0,0,0)"
};

// Obtained from https://www.rapidtables.com/web/color/Web_Safe.html
export const WebSafe: string[] = [
  "rgb(0,0,0)",
  "rgb(0,0,51)",
  "rgb(0,0,102)",
  "rgb(0,0,153)",
  "rgb(0,0,204)",
  "rgb(0,0,255)",
  "rgb(0,51,0)",
  "rgb(0,51,51)",
  "rgb(0,51,102)",
  "rgb(0,51,153)",
  "rgb(0,51,204)",
  "rgb(0,51,255)",
  "rgb(0,102,0)",
  "rgb(0,102,51)",
  "rgb(0,102,102)",
  "rgb(0,102,153)",
  "rgb(0,102,204)",
  "rgb(0,102,255)",
  "rgb(0,153,0)",
  "rgb(0,153,51)",
  "rgb(0,153,102)",
  "rgb(0,153,153)",
  "rgb(0,153,204)",
  "rgb(0,153,255)",
  "rgb(0,204,0)",
  "rgb(0,204,51)",
  "rgb(0,204,102)",
  "rgb(0,204,153)",
  "rgb(0,204,204)",
  "rgb(0,204,255)",
  "rgb(0,255,0)",
  "rgb(0,255,51)",
  "rgb(0,255,102)",
  "rgb(0,255,153)",
  "rgb(0,255,204)",
  "rgb(0,255,255)",
  "rgb(51,0,0)",
  "rgb(51,0,51)",
  "rgb(51,0,102)",
  "rgb(51,0,153)",
  "rgb(51,0,204)",
  "rgb(51,0,255)",
  "rgb(51,51,0)",
  "rgb(51,51,51)",
  "rgb(51,51,102)",
  "rgb(51,51,153)",
  "rgb(51,51,204)",
  "rgb(51,51,255)",
  "rgb(51,102,0)",
  "rgb(51,102,51)",
  "rgb(51,102,102)",
  "rgb(51,102,153)",
  "rgb(51,102,204)",
  "rgb(51,102,255)",
  "rgb(51,153,0)",
  "rgb(51,153,51)",
  "rgb(51,153,102)",
  "rgb(51,153,153)",
  "rgb(51,153,204)",
  "rgb(51,153,255)",
  "rgb(51,204,0)",
  "rgb(51,204,51)",
  "rgb(51,204,102)",
  "rgb(51,204,153)",
  "rgb(51,204,204)",
  "rgb(51,204,255)",
  "rgb(51,255,0)",
  "rgb(51,255,51)",
  "rgb(51,255,102)",
  "rgb(51,255,153)",
  "rgb(51,255,204)",
  "rgb(51,255,255)",
  "rgb(102,0,0)",
  "rgb(102,0,51)",
  "rgb(102,0,102)",
  "rgb(102,0,153)",
  "rgb(102,0,204)",
  "rgb(102,0,255)",
  "rgb(102,51,0)",
  "rgb(102,51,51)",
  "rgb(102,51,102)",
  "rgb(102,51,153)",
  "rgb(102,51,204)",
  "rgb(102,51,255)",
  "rgb(102,102,0)",
  "rgb(102,102,51)",
  "rgb(102,102,102)",
  "rgb(102,102,153)",
  "rgb(102,102,204)",
  "rgb(102,102,255)",
  "rgb(102,153,0)",
  "rgb(102,153,51)",
  "rgb(102,153,102)",
  "rgb(102,153,153)",
  "rgb(102,153,204)",
  "rgb(102,153,255)",
  "rgb(102,204,0)",
  "rgb(102,204,51)",
  "rgb(102,204,102)",
  "rgb(102,204,153)",
  "rgb(102,204,204)",
  "rgb(102,204,255)",
  "rgb(102,255,0)",
  "rgb(102,255,51)",
  "rgb(102,255,102)",
  "rgb(102,255,153)",
  "rgb(102,255,204)",
  "rgb(102,255,255)",
  "rgb(153,0,0)",
  "rgb(153,0,51)",
  "rgb(153,0,102)",
  "rgb(153,0,153)",
  "rgb(153,0,204)",
  "rgb(153,0,255)",
  "rgb(153,51,0)",
  "rgb(153,51,51)",
  "rgb(153,51,102)",
  "rgb(153,51,153)",
  "rgb(153,51,204)",
  "rgb(153,51,255)",
  "rgb(153,102,0)",
  "rgb(153,102,51)",
  "rgb(153,102,102)",
  "rgb(153,102,153)",
  "rgb(153,102,204)",
  "rgb(153,102,255)",
  "rgb(153,153,0)",
  "rgb(153,153,51)",
  "rgb(153,153,102)",
  "rgb(153,153,153)",
  "rgb(153,153,204)",
  "rgb(153,153,255)",
  "rgb(153,204,0)",
  "rgb(153,204,51)",
  "rgb(153,204,102)",
  "rgb(153,204,153)",
  "rgb(153,204,204)",
  "rgb(153,204,255)",
  "rgb(153,255,0)",
  "rgb(153,255,51)",
  "rgb(153,255,102)",
  "rgb(153,255,153)",
  "rgb(153,255,204)",
  "rgb(153,255,255)",
  "rgb(204,0,0)",
  "rgb(204,0,51)",
  "rgb(204,0,102)",
  "rgb(204,0,153)",
  "rgb(204,0,204)",
  "rgb(204,0,255)",
  "rgb(204,51,0)",
  "rgb(204,51,51)",
  "rgb(204,51,102)",
  "rgb(204,51,153)",
  "rgb(204,51,204)",
  "rgb(204,51,255)",
  "rgb(204,102,0)",
  "rgb(204,102,51)",
  "rgb(204,102,102)",
  "rgb(204,102,153)",
  "rgb(204,102,204)",
  "rgb(204,102,255)",
  "rgb(204,153,0)",
  "rgb(204,153,51)",
  "rgb(204,153,102)",
  "rgb(204,153,153)",
  "rgb(204,153,204)",
  "rgb(204,153,255)",
  "rgb(204,204,0)",
  "rgb(204,204,51)",
  "rgb(204,204,102)",
  "rgb(204,204,153)",
  "rgb(204,204,204)",
  "rgb(204,204,255)",
  "rgb(204,255,0)",
  "rgb(204,255,51)",
  "rgb(204,255,102)",
  "rgb(204,255,153)",
  "rgb(204,255,204)",
  "rgb(204,255,255)",
  "rgb(255,0,0)",
  "rgb(255,0,51)",
  "rgb(255,0,102)",
  "rgb(255,0,153)",
  "rgb(255,0,204)",
  "rgb(255,0,255)",
  "rgb(255,51,0)",
  "rgb(255,51,51)",
  "rgb(255,51,102)",
  "rgb(255,51,153)",
  "rgb(255,51,204)",
  "rgb(255,51,255)",
  "rgb(255,102,0)",
  "rgb(255,102,51)",
  "rgb(255,102,102)",
  "rgb(255,102,153)",
  "rgb(255,102,204)",
  "rgb(255,102,255)",
  "rgb(255,153,0)",
  "rgb(255,153,51)",
  "rgb(255,153,102)",
  "rgb(255,153,153)",
  "rgb(255,153,204)",
  "rgb(255,153,255)",
  "rgb(255,204,0)",
  "rgb(255,204,51)",
  "rgb(255,204,102)",
  "rgb(255,204,153)",
  "rgb(255,204,204)",
  "rgb(255,204,255)",
  "rgb(255,255,0)",
  "rgb(255,255,51)",
  "rgb(255,255,102)",
  "rgb(255,255,153)",
  "rgb(255,255,204)",
  "rgb(255,255,255)"
];
