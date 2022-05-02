import fs from 'fs';
import putTimes from './helpers/putTimes';

const TARGET = 'WC2E 9DD';

const jsonData = JSON.parse(fs.readFileSync('./output/coords.json', 'utf8'));

putTimes(jsonData, TARGET, 100);
