import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test-1', () => {
  expect(gendiff('./__fixtures__/test_1/file1.json', './__fixtures__/test_1/file2.json'))
    .toBe(readFile('/test_1/test1-result.txt'));
});

test('test-2', () => {
  expect(gendiff('./__fixtures__/test_2/file1.yml', './__fixtures__/test_2/file2.yml'))
    .toBeNull();
});
