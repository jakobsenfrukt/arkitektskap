const prepareColors = function(palette) {
  const newPalette = {
    light: palette.lightMuted.background,
    dark: palette.darkMuted.background,
  };
  do {
    newPalette.light = this.lightenDarkenColor(newPalette.light, 10);
    newPalette.dark = this.lightenDarkenColor(newPalette.dark, -10);
  } while (this.contrastRatio(newPalette.light, newPalette.dark) >= 1 / 7);
  return newPalette;
}
const hexToRgb = function(hex) {
  // function by Tim Down
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
const luminance = function(r, g, b) {
  // function by kirilloid
  var a = [r, g, b].map(function(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
const contrastRatio = function(color1hex, color2hex) {
  const color1 = this.hexToRgb(color1hex);
  const color2 = this.hexToRgb(color2hex);
  const color1luminance = this.luminance(color1.r, color1.g, color1.b);
  const color2luminance = this.luminance(color2.r, color2.g, color2.b);

  const ratio =
    color1luminance > color2luminance
      ? (color2luminance + 0.05) / (color1luminance + 0.05)
      : (color1luminance + 0.05) / (color2luminance + 0.05);

  return ratio;
}
const lightenDarkenColor = function(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export default prepareColors