import vscode from 'vscode';
import { KEY_DECORATORS } from "../../constants";
import { hslToRgb, rgbToHsl } from "../../lib";
import { Line, Preview } from "../types";

function isVariableLine(line: Line): boolean {
  return line.text.includes("--");
}

export function lineToPreview(line: Line): Preview | undefined {
  if (!isVariableLine(line)) {
    return undefined;
  }
  
  const lineSplit = line.text.split(":");
  if (lineSplit.length !== 2) {
    return undefined;
  }
  const [name, rawValue] = lineSplit;
  const value = rawValue.replace(";", "").trim();
  const valuePositionIndex = line.text.indexOf(value);
  return {
    line,
    variable: {
      name,
      value
    },
    positionIndex: valuePositionIndex
  };
}

export function createColorDecorator(preview: Preview, language: string): vscode.Disposable | undefined {

  const value = preview.variable.value;

  // distinguish between hex and hsl using percentage sign
  const valueSplit = value.replace(/,/g, "").split(" ");
  if (valueSplit.length >= 3) {
    const [h, s, l] = valueSplit;
    const isValidHsl = s.endsWith("%") && l.endsWith("%");
    if (!isValidHsl) {
      return undefined;
    }
  }


  const rgbFromHsl = hslToRgb(value);
  if (!rgbFromHsl) {
    return undefined;
  }

  return vscode.languages.registerColorProvider({ language, scheme: "file" }, {
    provideColorPresentations(color, context, token) {
      const hsl = rgbToHsl(color);
      if (!hsl) {
        return;
      }
      let newColor = [new vscode.ColorPresentation(hsl)];
      return newColor;
    },
    provideDocumentColors(document, token) {
      const positionStart = new vscode.Position(preview.line.lineIndex, preview.positionIndex);
      const positionEnd = new vscode.Position(preview.line.lineIndex, preview.positionIndex + preview.variable.value.length);
      const range = new vscode.Range(positionStart, positionEnd);

      const color = rgbFromHsl;
      return [new vscode.ColorInformation(range, color)];
    }
  });
}

export function updateDecoratorStore(context: vscode.ExtensionContext, decorators: vscode.Disposable[]) {
  context.workspaceState.update(KEY_DECORATORS, decorators);
}

export function disposeDecoratorStore(context: vscode.ExtensionContext) {
  const disposables: vscode.Disposable[] = context.workspaceState.get(KEY_DECORATORS) || [];
  disposables.forEach(disposable => disposable.dispose());
  updateDecoratorStore(context, []);
}
