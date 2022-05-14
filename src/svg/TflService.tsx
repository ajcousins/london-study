import { latlngToPixelCoord } from '../helpers';

interface LProps {
  line: {
    info: any;
    stops: {
      name: string;
      centerLatLng: number[];
    }[];
  };
  hoverState: any;
}

const TflService = ({ line, hoverState }: LProps) => {
  const { hoverInfo, setHoverInfo } = hoverState;

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

  const handleMouseEnter = (event: any) => {
    setHoverInfo({
      isHovered: true,
      text: event.target.id,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setHoverInfo({
      isHovered: false,
      text: '',
      x: 0,
      y: 0,
    });
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
            <g key={`${node.centerLatLng}`}>
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
              <circle
                className="hover"
                cx={latlngToPixelCoord(node.centerLatLng[1], 'x')}
                cy={latlngToPixelCoord(node.centerLatLng[0], 'y')}
                r="15"
                fill="transparent"
                id={node.name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          );
        })}
      </g>
    </>
  );
};

export default TflService;
