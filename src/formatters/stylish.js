import { isFlat } from '../getDiff.js';

const stylish = (preparingData, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    const [prefix, key, value1, value2, deep] = Object.keys(item);
    const indent = indentSymbol.repeat(indentCount * item[deep] - 2);

    let result = acc;

    const val1 = !isFlat(item[value1]) ? stylish(item[value1]) : item[value1];
    const val2 = !isFlat(item[value2]) ? stylish(item[value2]) : item[value2];

    switch (item[prefix]) {
      case 'not_modified':
        result += `${indent}  ${item[key]}: ${val1}\n`;
        break;
      case 'added':
        result += `${indent}+ ${item[key]}: ${val2}\n`;
        break;
      case 'removed':
        result += `${indent}- ${item[key]}: ${val1}\n`;
        break;
      case 'updated':
        result += `${indent}- ${item[key]}: ${val1}\n`
                + `${indent}+ ${item[key]}: ${val2}\n`;
        break;
      default:
        return null;
    }
    return result;
  };
  const lastIndent = indentSymbol
    .repeat(preparingData.at(-1).depth * indentCount - indentCount);

  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
