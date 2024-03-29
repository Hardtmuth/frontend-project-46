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
    if (['added', 'removed', 'not_modify'].includes(item.mod)) {
      const diff = { added: '+', removed: '-', not_modify: ' ' };
      return `${acc}${indent}${diff[item.mod]} ${item.key}: ${stringify(item.value, depth + 1)}\n`;
    }
    if (item.mod === 'nested_change') {
      return `${acc}${indent}  ${item.key}: ${stylish(item.value, depth + 1)}\n`;
    }
    if (item.mod === 'updated') {
      return `${acc}${indent}- ${item.key}: ${stringify(item.old_value, depth + 1)}\n`
           + `${indent}+ ${item.key}: ${stringify(item.new_value, depth + 1)}\n`;
    }
    return null;
  };
  const lastIndent = indentSymbol.repeat(indentCount * depth - indentCount);
  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
