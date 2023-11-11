import vscode from 'vscode';
import tinycolor from 'tinycolor2';

export function hslToRgb(colorStr: string): vscode.Color | undefined {
  const hsl = colorStr.split(" ").map(it => it.trim());
  const hslLen = hsl.length;
  if ((hslLen !== 3) && (hslLen !== 4)) {
    return undefined;
  }

  const hslPrefix = hslLen === 3 ? "hsl" : "hsla";
  const color = tinycolor(`${hslPrefix}(${hsl.join(", ")})`);
  if (!color.isValid()) {
    return undefined;
  }
  const {r, g, b, a} = color.toRgb();
  return new vscode.Color(
    toRgbRatio(r),
    toRgbRatio(g),
    toRgbRatio(b),
    a
  );
}

function toRgbRatio(rgb: number): number {
  return rgb / 255;
}

export function rgbToHsl({red, green, blue, alpha}: vscode.Color): string | undefined {
  const color = tinycolor.fromRatio({r: red, g: green, b: blue, a: alpha});
  if (!color.isValid()) {
    return undefined;
  }

  const hsl = color.toHslString();

  let hslStr;
  if (hsl.startsWith("hsl(")) {
    hslStr = hsl.substring(4, hsl.length - 1);
  } else {
    hslStr = hsl.substring(5, hsl.length - 1);
  }
  return hslStr.split(",").map(it => it.trim()).join(" ");
}

