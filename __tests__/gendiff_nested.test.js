import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('nested_json_files', () => {
  expect(gendiff(
    './__fixtures__/nested_structures/file3.json',
    './__fixtures__/nested_structures/file4.json',
  )).toBe(readFile('/nested_structures/nested_json_simple_result.txt'));
});

test('nested_json_files', () => {
  expect(gendiff(
    './__fixtures__/nested_structures/file1.json',
    './__fixtures__/nested_structures/file2.json',
  )).toBe(readFile('/nested_structures/nested_json_result.txt'));
});
