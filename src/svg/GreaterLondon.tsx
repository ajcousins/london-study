import React, { useEffect, useState } from 'react';
import elizabethLineA from '../data/lines/elizabeth-a.json';
import elizabethLineB from '../data/lines/elizabeth-b.json';
import elizabethLineC from '../data/lines/elizabeth-c.json';
import { valToColorHexDefined } from '../helpers';
import MapElements from './MapElements';
import TflService from './TflService';

const PIXEL_SIZE = 25;

interface IProps {
  colours: string[];
  scale: number[];
  journeyData: any;
  hoverState: any;
}

export default function GreaterLondon({
  colours,
  scale,
  journeyData,
  hoverState,
}: IProps) {
  const [cellsState, setCellsState] = useState<Cell[]>([]);

  useEffect(() => {
    if (!journeyData) return;
    else setCellsState([...journeyData.jsonData]);
  }, [journeyData]);

  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 1340 1085"
      enableBackground="new 0 0 1340 1140"
    >
      <rect id="Back" x="0" y="0" fill="#eeeeee" width="1425" height="1140" />
      {cellsState &&
        cellsState.map((cell) => {
          return (
            <rect
              className="cell"
              key={`${cell.centerLatLng}`}
              id="Cell"
              x={cell.pxCoord[1]}
              y={cell.pxCoord[0]}
              fill={valToColorHexDefined({
                journeyTime: cell.journeyTime,
                colourRanges: scale,
                colourPalette: colours,
              })}
              width={`${PIXEL_SIZE}`}
              height={`${PIXEL_SIZE}`}
            />
          );
        })}

      <MapElements />
      <TflService service={elizabethLineC} hoverState={hoverState} />
      <TflService service={elizabethLineB} hoverState={hoverState} />
      <TflService service={elizabethLineA} hoverState={hoverState} />
    </svg>
  );
}
