import path from 'path';
import parse from './parsers.js';
import getDiff from './getFlatDiff.js';
import stylish from './stylish.js';

const getFileFormat = (filepath) => filepath.split('.').at(-1);

const gendiff = (pathToFile1, pathToFile2) => {
  const pathFile1 = path.resolve(pathToFile1);
  const pathFile2 = path.resolve(pathToFile2);

  const dataFile1 = parse(pathFile1, getFileFormat(pathFile1));
  const dataFile2 = parse(pathFile2, getFileFormat(pathFile2));

  return stylish(getDiff(dataFile1, dataFile2));
};

export default gendiff;
