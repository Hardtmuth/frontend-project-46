import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish_formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toBe(readFile('nested_json_result.txt'));
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml')))
    .toBe(readFile('nested_json_result.txt'));
});

test('plain_formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain'))
    .toBe(readFile('plain_result.txt'));
});

test('json_formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toBe(readFile('json_result.json'));
});
