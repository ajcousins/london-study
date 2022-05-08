import { Cell } from './Cell';

interface IProps {
  colours: string[];
  scale: number[];
}

export const Scale = ({ colours, scale }: IProps) => {
  return (
    <div className="section-wrapper">
      Scale (minutes)
      <div className="scale">
        {colours.map((colour, i) => {
          return (
            <Cell
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
