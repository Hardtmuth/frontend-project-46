import { isFlat } from '../getDiff.js';

const stringify = (data, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  if (isFlat(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const deep = data?.depth ? data.depth : depth;
  const indent = indentSymbol.repeat(indentCount * deep - 2);
  const cb = (acc, item) => {
    let res = acc;
    const [key, value] = item;
    const val = isFlat(value) ? value : stringify(value, depth + 1);
    res += `${indent}  ${key}: ${val}\n`;
    return res;
  };
  const result = entries.reduce(cb, '');
  const lastIndent = indentSymbol.repeat(depth * indentCount - indentCount);
  return `{\n${result}${lastIndent}}`;
};

const stylish = (preparingData, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    // console.log(item);
    const deep = item?.depth ? item.depth : depth;
    const indent = indentSymbol.repeat(indentCount * deep - 2);
    let result = acc;
    // console.log('valuse is: ', item.value);
    const value = isFlat(item.value) ? item.value : stringify(item.value, depth + 1);
    switch (item.mod) {
      case 'nested_change':
        result += `${indent}  ${item.key}: ${stylish(item.value, depth + 1)}\n`;
        break;
      case 'not_modify':
        result += `${indent}  ${item.key}: ${value}\n`;
        break;
      case 'added':
        result += `${indent}+ ${item.key}: ${value}\n`;
        break;
      case 'removed':
        result += `${indent}- ${item.key}: ${value}\n`;
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
  const lastIndent = indentSymbol.repeat(depth * indentCount - indentCount);
  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
