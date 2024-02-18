import { isFlat } from '../getDiff.js';

const stringify = (data, localdepth = 1, indentSymbol = ' ', indentCount = 4) => {
  if (isFlat(data)) {
    return data;
  }
  const result = Object.entries(data).reduce((ac, [key, value]) => {
    const val = isFlat(value) ? value : stringify(value, localdepth + 1);
    return `${ac}${indentSymbol.repeat(indentCount * localdepth - 2)}  ${key}: ${val}\n`;
  }, '');
  return `{\n${result}${indentSymbol.repeat(indentCount * localdepth - indentCount)}}`;
};

const stylish = (preparingData, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    const deep = item?.depth || depth;
    const indent = indentSymbol.repeat(indentCount * deep - 2);
    let result = acc;
    switch (item.mod) {
      case 'nested_change':
        result += `${indent}  ${item.key}: ${stylish(item.value, depth + 1)}\n`;
        break;
      case 'not_modify':
        result += `${indent}  ${item.key}: ${stringify(item.value, depth + 1)}\n`;
        break;
      case 'added':
        result += `${indent}+ ${item.key}: ${stringify(item.value, depth + 1)}\n`;
        break;
      case 'removed':
        result += `${indent}- ${item.key}: ${stringify(item.value, depth + 1)}\n`;
        break;
      case 'updated':
        result += `${indent}- ${item.key}: ${stringify(item.old_value, depth + 1)}\n`
                + `${indent}+ ${item.key}: ${stringify(item.new_value, depth + 1)}\n`;
        break;
      default:
        return null;
    }
    return result;
  };
  const lastIndent = indentSymbol.repeat(indentCount * depth - indentCount);
  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
