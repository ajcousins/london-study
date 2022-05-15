import { latlngToPixelCoord } from '../helpers';

interface LProps {
  service: {
    info: any;
    stops: {
      name: string;
      centerLatLng: number[];
    }[];
  };
  hoverState: any;
}

const TflService = ({ service, hoverState }: LProps) => {
  const { hoverInfo, setHoverInfo } = hoverState;

  const stationArr = [...service.stops];
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

  const line = (pointA: number[], pointB: number[]) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };
  // Reference: https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

  const controlPoint = (
    current: number[],
    previous: number[],
    next: number[],
    reverse: boolean
  ): number[] => {
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.2;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  };
  // Reference: https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

  const bezierMaker = (points: number[][]) => {
    let pathString = '';
    for (let i = 0; i < points.length; i++) {
      const curPoint = points[i].join(' ');
      if (i === 0) {
        pathString += `M ${curPoint} C `;
      } else {
        const [cpsX, cpsY] = controlPoint(
          points[i - 1],
          points[i - 2],
          points[i],
          false
        );
        const [cpeX, cpeY] = controlPoint(
          points[i],
          points[i - 1],
          points[i + 1],
          true
        );
        pathString += `${cpsX} ${cpsY} ${cpeX} ${cpeY} ${curPoint} `;
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
          stroke={service.info.hexColor}
          fill="transparent"
        />
        {service.stops.map((node) => {
          return (
            <g key={`${node.centerLatLng}`}>
              <circle
                cx={latlngToPixelCoord(node.centerLatLng[1], 'x')}
                cy={latlngToPixelCoord(node.centerLatLng[0], 'y')}
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
