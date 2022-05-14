import fs from 'fs';
import { Cell } from './types';
import putTimes from './helpers/putTimes';
import cliProgress from 'cli-progress';
import { checkCompletedCells } from './helpers/checkCompletedCells';
import { updateJsonArr } from './helpers/putTimes';

const TARGET = 'w21hb';

const manageBuild = async () => {
  let jsonData = [
    ...JSON.parse(fs.readFileSync('./output/coords.json', 'utf8')),
  ];
  const sumAllCells = jsonData.length;
  let sumCompletedCells = 0;

  const progress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  progress.start(sumAllCells, 0);
  sumCompletedCells = checkCompletedCells(jsonData);
  progress.update(sumCompletedCells);

  async function batch(): Promise<Cell[]> {
    const result = await putTimes(jsonData, TARGET, 1);

    const newArr = updateJsonArr(jsonData, result);
    jsonData = [...newArr];
    sumCompletedCells = checkCompletedCells(jsonData);
    progress.update(sumCompletedCells);

    return newArr;
  }

  async function loop() {
    while (sumCompletedCells < sumAllCells) {
      await batch();
    }
    progress.stop();
  }

  loop();
};

manageBuild();
