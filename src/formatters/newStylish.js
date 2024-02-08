const stylish = (preparingData, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    let result = acc;
    const [prefix, key, , value1, , value2, deep] = Object.keys(item);
    const indent = indentSymbol.repeat(indentCount * item[deep] - 2);
    switch (item[prefix]) {
      case 'not_modified':
        result += `${indent}  ${item[key]}: ${item[value1]}\n`;
        break;
      case 'added':
        result += `${indent}+ ${item[key]}: ${item[value2]}\n`;
        break;
      case 'removed':
        result += `${indent}- ${item[key]}: ${item[value1]}\n`;
        break;
      case 'updated':
        result += `${indent}- ${item[key]}: ${item[value1]}\n`
                + `${indent}+ ${item[key]}: ${item[value2]}\n`;
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
