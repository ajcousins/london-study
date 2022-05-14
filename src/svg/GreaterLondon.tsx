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
      // width="1425px"
      // height="1085px"
      width="100%"
      height="100%"
      viewBox="0 0 1340 1085"
      enableBackground="new 0 0 1340 1140"
      // xmlSpace="preserve"
    >
      <rect id="Back" x="0" y="0" fill="black" width="1425" height="1140" />
      {cellsState &&
        cellsState.map((cell) => {
          return (
            <rect
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

      <TflService line={elizabethLineC} hoverState={hoverState} />
      <TflService line={elizabethLineB} hoverState={hoverState} />
      <TflService line={elizabethLineA} hoverState={hoverState} />
    </svg>
  );
}
