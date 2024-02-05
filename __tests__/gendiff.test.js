import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('nested_json_files', () => {
  expect(gendiff(getFixturePath('file3.json'), getFixturePath('file4.json')))
    .toBe(readFile('nested_json_simple_result.txt'));
});

test('nested_json_files_2', () => {
  expect(gendiff(getFixturePath('file5.json'), getFixturePath('file6.json')))
    .toBe(readFile('nested_json_result_1.txt'));
});

test('nested_json_files_3', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toBe(readFile('nested_json_result.txt'));
});