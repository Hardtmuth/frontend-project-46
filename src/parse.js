import { readFileSync } from 'node:fs';
import path from 'path';

const parse = (filePath, format) => {
  const fpath = path.resolve(filePath);
  const fileData = readFileSync(fpath, 'utf8');

  if (format === 'json') {
    const result = JSON.parse(fileData);
    return result;
  }
  return null;
};

// console.log(parse('./file1.json', 'yml'));
export default parse;
