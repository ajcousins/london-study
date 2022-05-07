import fs from 'fs';
import putTimes from './helpers/putTimes';

const TARGET = 'wc2e7aw'; //postcode should be lower case with no spaces

const jsonData = JSON.parse(fs.readFileSync('./output/coords.json', 'utf8'));

putTimes(jsonData, TARGET, 1);
