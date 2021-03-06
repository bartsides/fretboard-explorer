// https://johnsaucier.com/calculating-fret-positions
// Formula for calculating distance between frets
// Fret Distance = Remaining Length / 17.817

export default {
  getSpacing(fret) {
    let remainingScaleLength = 1;
    let currentFret = 1;
    let spacing = 0;
    while (currentFret <= fret) {
      spacing = remainingScaleLength / 17.817;
      remainingScaleLength -= spacing;
      currentFret++;
    }
    return spacing;
  }
};
