import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat_json_files', () => {
  expect(gendiff(
    './__fixtures__/test_flat_files/file1.json',
    './__fixtures__/test_flat_files/file2.json',
  )).toBe(readFile('/test_flat_files/flat_json_result.txt'));
});

test('flat_yml_files', () => {
  expect(gendiff(
    './__fixtures__/test_flat_files/file1.yml',
    './__fixtures__/test_flat_files/file2.yml',
  )).toBe(readFile('/test_flat_files/flat_yml_result.txt'));
});

test('flat_json_vs_yml', () => {
  expect(gendiff(
    './__fixtures__/test_flat_files/file1.json',
    './__fixtures__/test_flat_files/file3.yml',
  )).toBe(readFile('/test_flat_files/flat_json_result.txt'));
});
