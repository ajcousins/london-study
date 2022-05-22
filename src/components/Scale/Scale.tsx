import { Cell } from './Cell';

interface IProps {
  colours: string[];
  scale: number[];
}

export const Scale = ({ colours, scale }: IProps) => {
  return (
    <div className="section-wrapper section-wrapper__scale">
      Minutes
      <div className="scale">
        {colours.map((colour, i) => {
          return (
            <Cell
              key={i}
              colourHex={colour}
              label={scale[i]}
              isLast={i === colour.length}
            />
          );
        })}
      </div>
    </div>
  );
};
