import {
  valToColorHex,
  valToColorHexDefined,
  latlngToPixelCoord,
} from '../helpers';

interface LProps {
  line: {
    info: any;
    stops: {
      name: string;
      centerLatLng: number[];
    }[];
  };
}

const TflService = ({ line }: LProps) => {
  const stationArr = [...line.stops];
  if (
    stationArr[0].centerLatLng[1] >
    stationArr[stationArr.length - 1].centerLatLng[1]
  ) {
    stationArr.reverse();
  }

  const pixelCoords = stationArr.map((station) => {
    return [
      latlngToPixelCoord(station.centerLatLng[1], 'x'),
      latlngToPixelCoord(station.centerLatLng[0], 'y'),
    ];
  });

  const bezierMaker = (points: number[][]) => {
    const factor = 0.375;
    let pathString = '';

    for (let i = 0; i < points.length; i++) {
      const curPoint = points[i].join(' ');
      if (i === 0) {
        pathString += `M ${curPoint} C `;
      } else {
        const ctrlOffsetX = (points[i][0] - points[i - 1][0]) * factor;
        const forwardCtrlX = points[i - 1][0] + ctrlOffsetX;
        const backwardCtrlX = points[i][0] - ctrlOffsetX;
        pathString += `${forwardCtrlX} ${points[i - 1][1]} ${backwardCtrlX} ${
          points[i][1]
        } ${curPoint} `;
      }
    }

    return pathString;
  };

  return (
    <>
      <g>
        <path
          d={bezierMaker(pixelCoords)}
          strokeWidth="5"
          stroke={line.info.hexColor}
          fill="transparent"
        />
        {line.stops.map((node) => {
          return (
            <circle
              cx={latlngToPixelCoord(node.centerLatLng[1], 'x')}
              cy={latlngToPixelCoord(node.centerLatLng[0], 'y')}
              // r="7"
              // fill={line.info.hexColor}
              r="6"
              fill="white"
              stroke="black"
              strokeWidth="3"
            />
          );
        })}
      </g>
    </>
  );
};

export default TflService;
