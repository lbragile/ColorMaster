import RGBColors from "./models/rgb";

const cm = new RGBColors(128, 128, 0);
console.log(cm.rgbObj); // { r: 128, g: 128, b: 0 }
console.log(cm.string()); // 'rgb(128, 128, 0)'

// add alpha
console.log(cm.alpha(0.5).string(true)); // 'rgb(128, 128, 0, 0.5)'

// set object directly
cm.rgbObj = { ...cm.rgbObj, r: 100 };
console.log(cm.string()); // 'rgb(100, 128, 0)'

// set object via helper function
cm.changeChannelValue("green", 200);
console.log(cm.string()); // 'rgb(100, 200, 0)'
console.log(cm.string(true)); // 'rgb(100, 200, 0, 0.5)'
