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
    let resultString = '';
    let val = '';
    if (['added', 'removed', 'not_modify'].includes(item.mod)) {
      const diff = { added: '+', removed: '-', not_modify: ' ' };
      val = stringify(item.value, depth + 1);
      resultString = `${acc}${indent}${diff[item.mod]} ${item.key}: ${val}\n`;
    }
    if (item.mod === 'nested_change') {
      val = stylish(item.value, depth + 1);
      resultString = `${acc}${indent}  ${item.key}: ${val}\n`;
    }
    if (item.mod === 'updated') {
      val = stringify(item.old_value, depth + 1);
      const val2 = stringify(item.new_value, depth + 1);
      resultString = `${acc}${indent}- ${item.key}: ${val}\n`
                   + `${indent}+ ${item.key}: ${val2}\n`;
    }
    return resultString;
  };
  const lastIndent = indentSymbol.repeat(indentCount * depth - indentCount);
  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
