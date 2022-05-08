import React from 'react';
import './App.scss';
import GreaterLondon from './svg/GreaterLondon';
import { yellowPurpBlueWide } from './gradients';
import Scale from './components/Scale';
import Footer from './components/Footer';

const scaleDefinition = [15, 30, 45, 60, 75, 90, 105, 120];

const dataOptions = ['Covent Garden', 'Canary Wharf'];

interface IProps {
  title: string;
  options: string[];
}

const Option = ({optionName}: any) => {
  return (
    <div className="option-tile">
      <input type="radio" id="age1" name="age" value="30" />
      <label className="option-tile__label" htmlFor="age1">{optionName}</label>
      <br></br>
    </div>
  );
};

const DataOptions = ({ title, options }: IProps) => {
  return (
    <div className="section-wrapper">
      <div>{title}</div>
      {options.map(option => {
        return <Option optionName={option}/>
      })}

    </div>
  );
};

function App() {
  return (
    <>
      <div className="page">
        <h1>Greater London Journey Times</h1>
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

        <h2>1.0 Journey Times from Central London</h2>
        <h2 className="sub-heading">
          April 2022 - Weekday at 14:00 to Covent Garden - Before Elizabeth Line
          opening
        </h2>
        <GreaterLondon colours={yellowPurpBlueWide} scale={scaleDefinition} />
        <Scale colours={yellowPurpBlueWide} scale={scaleDefinition} />
        <DataOptions title={'Origin'} options={dataOptions} />
      </div>
      <Footer />
    </>
  );
}

export default App;
