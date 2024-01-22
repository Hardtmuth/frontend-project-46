import { readFileSync } from 'node:fs';

const parse = (path) => {
  const result = readFileSync(path, 'utf8', (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  return result;
}  

// console.log(parse('./file1.json'));
export default parse;