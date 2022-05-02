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
