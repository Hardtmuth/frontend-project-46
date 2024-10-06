import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filepath) => filepath.split('.').at(-1);

const fileData = (fp) => readFileSync(path.resolve(fp), 'utf8');

const genDiff = (pathToFile1, pathToFile2, formater = 'stylish') => {
  const pathFile1 = path.resolve(pathToFile1);
  const pathFile2 = path.resolve(pathToFile2);

  const dataFile1 = parse(fileData(pathFile1), getFileFormat(pathFile1));
  const dataFile2 = parse(fileData(pathFile2), getFileFormat(pathFile2));

  return getFormat(formater)(getDiff(dataFile1, dataFile2)).trimEnd();
};

export default genDiff;
