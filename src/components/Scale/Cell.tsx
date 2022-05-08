export const Cell = ({ colourHex, label, isLast }: any) => {
  return (
    <div className="scale__cell">
      <div
        className="scale__cell__swatch"
        style={{ backgroundColor: colourHex }}
      />
      <div className="scale__cell__label">
        {label}
        {isLast && '+'}
      </div>
    </div>
  );
};