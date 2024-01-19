import { readFileSync } from 'node:fs';

const file1Data = readFileSync('./file1.json', 'utf8', (err, data) => {
  if (err) throw err;
  return JSON.parse(data);
}); 

console.log(file1Data);