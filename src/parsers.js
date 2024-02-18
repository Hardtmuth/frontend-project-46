import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath, format) => {
  const fileData = readFileSync(path.resolve(filePath), 'utf8');

  if (format === 'json') {
    return JSON.parse(fileData);
  }
  if (['yml', 'yaml'].includes(format)) {
    return yaml.load(fileData);
  }
  throw Error('Unexpected file extension');
};

export default parse;
