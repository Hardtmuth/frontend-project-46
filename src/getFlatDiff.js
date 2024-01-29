import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

//  const pathToFile1 = './__fixtures__/test_flat_files/file1.json';
//  const pathToFile2 = './__fixtures__/test_flat_files/file2.json';

const pathToFile1 = './__fixtures__/nested_structures/file1.json';
const pathToFile2 = './__fixtures__/nested_structures/file2.json';

const getFileFormat = (filepath) => filepath.split('.').at(-1);

const isFlat = (data) => (typeof data !== 'object' && data !== null);

const pathFile1 = path.resolve(pathToFile1);
const pathFile2 = path.resolve(pathToFile2);

const formatFile1 = getFileFormat(pathFile1);
const formatFile2 = getFileFormat(pathFile2);

const dataFile1 = parse(pathFile1, formatFile1);
// console.log(dataFile1);
const dataFile2 = parse(pathFile2, formatFile2);
// console.log(dataFile2);

const getFlatDiff = (data1, data2, sp = 2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  console.log(keys);

  const prepare = keys.map((item) => {
    const result = [item];
    const val1 = data1 === undefined ? undefined : data1[item];
    const val2 = data2 === undefined ? undefined : data2[item];
    return [...result, val1, val2];
  });

  const cb = (arr, space = 2) => {
    let result = '';
    let prefix = ' ';
    const tab = ' '.repeat(space);

    const [key, val1, val2] = arr;

    if (isFlat(val1) && isFlat(val2)) {
      if (val2 === undefined) {
        prefix = '-';
        result += `${tab}${prefix} ${key}: ${val1}\n`;
      } else if (val1 === undefined) {
        prefix = '+';
        result += `${tab}${prefix} ${key}: ${val2}\n`;
      } else if (val1 !== val2) {
        result += `${tab}- ${key}: ${val1}\n`;
        result += `${tab}+ ${key}: ${val2}\n`;
      } else if (val1 === val2) {
        result += `${tab}${prefix} ${key}: ${val1}\n`;
      }
    } else {
      result += getFlatDiff(val1, val2, sp + sp);
    }
    return result;
  };

  const res = prepare.map((el) => (`${cb(el, sp + 2)}`));
  return `${res.join('')}`;
};

console.log(getFlatDiff(dataFile1, dataFile2));
