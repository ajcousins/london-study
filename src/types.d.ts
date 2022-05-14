interface Cell {
  pxCoord: number[];
  centerLatLng: number[];
  journeyTime: number;
}

interface CanvasStyles {
  canvas: {
    fillColor: string;
  };
  borough: {
    fillColor: string;
    strokeColor: string;
    strokeWidth: string;
    strokeLinecap: 'round' | 'butt' | 'square' | 'inherit' | undefined;
    strokeLinejoin: 'round' | 'inherit' | 'miter' | 'bevel' | undefined;
    strokeMiterlimit: string;
  };
  greaterLondon: {
    strokeColor: string;
    strokeWidth: string;
  };
  water: {
    fillColor: string;
    strokeColor: string;
    strokeWidth: string;
  };
}

interface HexOptions {
  journeyTime: number;
  colourRanges: number[];
  colourPalette: string[];
}

interface JourneyData {
  pxCoord: number[];
  centerLatLng: number[];
  journeyTime: number;
}