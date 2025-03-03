import { SelectMixedOption } from "naive-ui/es/select/src/interface";

export function calcFretWidth(fret: number, defaultFretWidth: number): number {
  if (fret === 0) return defaultFretWidth + 10;
  let remainingScaleLength = 1;
  let currentFret = 1;
  let spacing = 0;
  while (currentFret <= fret) {
    spacing = remainingScaleLength / 17.817;
    remainingScaleLength -= spacing;
    currentFret++;
  }
  return defaultFretWidth * 32 * spacing;
}

export function calcFretWidths(
  frets: number,
  defaultFretWidth: number
): number[] {
  let res: number[] = [defaultFretWidth];
  let remainingScaleLength = 1;
  let currentFret = 1;
  while (currentFret <= frets) {
    const spacing = remainingScaleLength / 17.817;
    res.push(defaultFretWidth * 32 * spacing);
    remainingScaleLength -= spacing;
    currentFret++;
  }
  return res;
}

export function getOption(name: string): SelectMixedOption {
  return { label: name, value: name };
}
