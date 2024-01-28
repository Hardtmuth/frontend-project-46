import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';

const getFileFormat = (filepath) => filepath.split('.').at(-1);

const parse = (filePath, format) => {
  const fpath = path.resolve(filePath);
  const fileData = readFileSync(fpath, 'utf8');

  if (format === 'json') {
    const result = JSON.parse(fileData);
    return result;
  }
  return null;
};

const gendiff = (pathToFile1, pathToFile2) => {
  const pathFile1 = path.resolve(pathToFile1);
  const pathFile2 = path.resolve(pathToFile2);

  const formatFile1 = getFileFormat(pathFile1);
  const formatFile2 = getFileFormat(pathFile2);

  const dataFile1 = parse(pathFile1, formatFile1);
  // console.log(dataFile1);
  const dataFile2 = parse(pathFile2, formatFile2);
  // console.log(dataFile2);

  const allKeys = _.sortBy(Object.keys({ ...dataFile1, ...dataFile2 }));
  // console.log(allKeys);

  if (allKeys.length === 0) {
    return null;
  }

  const cb = (acc, key) => {
    let result = '';
    let prefix = ' ';

    if (key in dataFile1 && !(key in dataFile2)) {
      prefix = '-';
      result += `${acc}  ${prefix} ${key}: ${dataFile1[key]}\n`;
    } else if (!(key in dataFile1) && key in dataFile2) {
      prefix = '+';
      result += `${acc}  ${prefix} ${key}: ${dataFile2[key]}\n`;
    } else if (key in dataFile1 && key in dataFile2) {
      if (dataFile1[key] !== dataFile2[key]) {
        result += `${acc}  - ${key}: ${dataFile1[key]}\n`;
        result += `  + ${key}: ${dataFile2[key]}\n`;
        // return result;
      } else if (dataFile1[key] === dataFile2[key]) {
        result += `${acc}  ${prefix} ${key}: ${dataFile1[key]}\n`;
      }
    }
    return result;
  };
  return `{\n${allKeys.reduce(cb, '')}}`;
};

export default gendiff;
