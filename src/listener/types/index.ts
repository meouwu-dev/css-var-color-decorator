export type Line = {
  text: string;
  lineIndex: number;
};

export type CSSVariable = {
  name: string;
  value: string;
};

export type Preview = {
  line: Line;
  variable: CSSVariable;
  positionIndex: number;
};