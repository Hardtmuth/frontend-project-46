import _ from 'lodash';

const stringify = (data, localdepth = 1, indentSymbol = ' ', indentCount = 4) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const result = Object.entries(data).reduce((ac, [key, value]) => {
    const val = !_.isPlainObject(value) ? value : stringify(value, localdepth + 1);
    return `${ac}${indentSymbol.repeat(indentCount * localdepth - 2)}  ${key}: ${val}\n`;
  }, '');
  return `{\n${result}${indentSymbol.repeat(indentCount * localdepth - indentCount)}}`;
};

const stylish = (preparingData, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    const deep = item?.depth || depth;
    const indent = indentSymbol.repeat(indentCount * deep - 2);
    const resObj = {};
    if (['added', 'removed', 'not_modify'].includes(item.mod)) {
      const diff = { added: '+', removed: '-', not_modify: ' ' };
      resObj.val = stringify(item.value, depth + 1);
      resObj.resultString = `${acc}${indent}${diff[item.mod]} ${item.key}: ${resObj.val}\n`;
    }
    if (item.mod === 'nested_change') {
      resObj.val = stylish(item.value, depth + 1);
      resObj.resultString = `${acc}${indent}  ${item.key}: ${resObj.val}\n`;
    }
    if (item.mod === 'updated') {
      resObj.val = stringify(item.old_value, depth + 1);
      resObj.val2 = stringify(item.new_value, depth + 1);
      resObj.resultString = `${acc}${indent}- ${item.key}: ${resObj.val}\n`
                          + `${indent}+ ${item.key}: ${resObj.val2}\n`;
    }
    return resObj.resultString;
  };
  const lastIndent = indentSymbol.repeat(indentCount * depth - indentCount);
  return `{\n${preparingData.reduce(getStylishString, '')}${lastIndent}}`;
};

export default stylish;
