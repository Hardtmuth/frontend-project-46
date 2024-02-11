import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath, format) => {
  const fileData = readFileSync(path.resolve(filePath), 'utf8');
  let result;

  if (format === 'json') {
    result = JSON.parse(fileData);
  } else if (['yml', 'yaml'].includes(format)) {
    result = yaml.load(fileData);
  } else {
    throw Error('Unexpected file extension');
  }
  return result;
};

export default parse;
