import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Json = getFixturePath('file1.json');
const file1Yml = getFixturePath('file1.yml');
const file1Yaml = getFixturePath('file1.yaml');

const file2Json = getFixturePath('file2.json');
const file2Yml = getFixturePath('file2.yml');
const file2Yaml = getFixturePath('file2.yaml');

const stylishResult = readFile('nested_json_result.txt');
const plainResult = readFile('plain_result.txt');
const jsonResult = readFile('json_result.json');

describe('stylish_formatter', () => {
  test.each([
    [file1Json, file2Json, stylishResult],
    [file1Json, file2Yml, stylishResult],
    [file1Json, file2Yaml, stylishResult],
    [file1Yml, file2Json, stylishResult],
    [file1Yml, file2Yml, stylishResult],
    [file1Yml, file2Yaml, stylishResult],
    [file1Yaml, file2Json, stylishResult],
    [file1Yaml, file2Yml, stylishResult],
    [file1Yaml, file2Yaml, stylishResult],
  ])(
    'compare %s with %s and showing differences',
    (firstFile, secondFile, differences) => {
      const result = genDiff(firstFile, secondFile);
      expect(result).toEqual(differences);
    },
  );
});

describe('plain_formatter', () => {
  test.each([
    [file1Json, file2Json, plainResult],
    [file1Json, file2Yml, plainResult],
    [file1Json, file2Yaml, plainResult],
    [file1Yml, file2Json, plainResult],
    [file1Yml, file2Yml, plainResult],
    [file1Yml, file2Yaml, plainResult],
    [file1Yaml, file2Json, plainResult],
    [file1Yaml, file2Yml, plainResult],
    [file1Yaml, file2Yaml, plainResult],
  ])(
    'compare %s with %s and showing differences',
    (firstFile, secondFile, differences) => {
      const result = genDiff(firstFile, secondFile, 'plain');
      expect(result).toEqual(differences);
    },
  );
});

describe('json_formatter', () => {
  test.each([
    [file1Json, file2Json, jsonResult],
    [file1Json, file2Yml, jsonResult],
    [file1Json, file2Yaml, jsonResult],
    [file1Yml, file2Json, jsonResult],
    [file1Yml, file2Yml, jsonResult],
    [file1Yml, file2Yaml, jsonResult],
    [file1Yaml, file2Json, jsonResult],
    [file1Yaml, file2Yml, jsonResult],
    [file1Yaml, file2Yaml, jsonResult],
  ])(
    'compare %s with %s and showing differences',
    (firstFile, secondFile, differences) => {
      const result = genDiff(firstFile, secondFile, 'json');
      expect(result).toEqual(differences);
    },
  );
});
