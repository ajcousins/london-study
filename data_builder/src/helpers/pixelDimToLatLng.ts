const pixelDimToLatLng = (
  pixelDim: number,
  widthOrHeight: 'h' | 'w'
): number => {
  if (widthOrHeight === 'h') {
    return pixelDim / 2409.79482765624;
  } else return pixelDim / 1511.25415639718;
};

export default pixelDimToLatLng;
