export const valToColorHex = (
  val: number,
  max: number,
  gradient: string[]
): string => {
  const colors = [...gradient];
  const colorIndex = Math.floor((val / max) * (colors.length - 1));
  return colorIndex > colors.length
    ? colors[colors.length - 1]
    : colors[colorIndex];
};



export const valToColorHexDefined = (hexOptions:HexOptions):string => {
  let idx = hexOptions.colourRanges.reduce((prev, cur) => {
    if (hexOptions.journeyTime > cur) return prev + 1;
    else return prev;
  }, 0)
  
  if (idx > hexOptions.colourPalette.length - 1) idx = hexOptions.colourPalette.length - 1;

  return hexOptions.colourPalette[idx];
}