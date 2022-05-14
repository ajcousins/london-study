import React, { useState, useEffect } from 'react';
import './App.scss';
import GreaterLondon from './svg/GreaterLondon';
import { yellowPurpBlueWide } from './gradients';
import Scale from './components/Scale';
import Footer from './components/Footer';
import coventGarden from '../src/data/covent-garden_25.json';
import canaryWharf from '../src/data/canary-wharf_25.json';
import moorgate from '../src/data/moorgate_25.json';
import DataOptions from './components/DataOptions';

const scaleDefinition = [15, 30, 45, 60, 75, 90, 105, 120];

const dataOptions = [
  { name: 'Covent Garden', jsonData: coventGarden },
  { name: 'Canary Wharf', jsonData: canaryWharf },
  { name: 'Moorgate', jsonData: moorgate },
];

function App() {
  const [journeyData, setJourneyData] = useState<{
    name: string;
    jsonData: JourneyData[];
  }>();

  useEffect(() => {
    setJourneyData(dataOptions[0]);
  }, []);

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
        <GreaterLondon
          colours={yellowPurpBlueWide}
          scale={scaleDefinition}
          journeyData={journeyData}
        />
        <Scale colours={yellowPurpBlueWide} scale={scaleDefinition} />
        <DataOptions
          title={'Origin'}
          options={dataOptions}
          selected={journeyData ? journeyData.name : ''}
          state={{ journeyData, setJourneyData }}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
