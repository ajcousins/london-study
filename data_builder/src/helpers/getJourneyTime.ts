import axios from 'axios';

const getJourneyTime = async (cellCoords: string, target: string) => {
  const params = {
    app_key: `${process.env.REACT_APP_TFL_API_KEY}`,
    time: '1400',
    timeIs: 'Departing',
  };
  try {
    const res = await axios.get(
      `https://api.tfl.gov.uk/Journey/JourneyResults/${cellCoords}/to/${target}`,
      { params }
    );
    return res.data.journeys.reduce(
      (prev: number, cur: any) => (cur.duration < prev ? cur.duration : prev),
      Infinity
    );
  } catch(err) {
    return null;
  }
};

export default getJourneyTime;
