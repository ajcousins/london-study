import React from 'react';
import './App.scss';
import GreaterLondon from './svg/GreaterLondon';
import { yellowPurpBlueWide } from './gradients';

const scaleDefinition = [15, 30, 45, 60, 75, 90, 105, 120];
interface IProps {
  colours: string[];
  scale: number[];
}

const Scale = ({ colours, scale }: IProps) => {
  return (
    <div className="scale__wrapper">
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

const Cell = ({ colourHex, label, isLast }: any) => {
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

const Footer = () => {
  return <div className="footer"></div>;
};

function App() {
  return (
    <>
      <div className="page">
        <h1 className="page-header">Greater London Journey Times</h1>
        <h1 className="sub-heading">
          A study using the TfL API.&nbsp;
          <a
            href="https://api-portal.tfl.gov.uk/"
            target="_blank"
            rel="noreferrer"
          >
            https://api-portal.tfl.gov.uk/
          </a>
        </h1>

        <h2 className="section-header">
          1.0 Journey Times from Central London
        </h2>
        <h2 className="sub-heading">
          April 2022 - Weekday at 14:00 to Covent Garden - Before Elizabeth Line
          opening
        </h2>
        <GreaterLondon colours={yellowPurpBlueWide} scale={scaleDefinition} />
        <Scale colours={yellowPurpBlueWide} scale={scaleDefinition} />
      </div>
      <Footer />
    </>
  );
}

export default App;
