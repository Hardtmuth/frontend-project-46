import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath, format) => {
  const fpath = path.resolve(filePath);
  const fileData = readFileSync(fpath, 'utf8');
  let result;

  if (format === 'json') {
    result = JSON.parse(fileData);
  } else if (['yml', 'yaml'].includes(format)) {
    result = yaml.load(fileData);
  }
  return result;
};

export default parse;
