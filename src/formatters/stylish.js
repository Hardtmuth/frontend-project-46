const stylish = (preparingData, depth = 1, indentSymbol = ' ', indentCount = 4) => {
  const getStylishString = (acc, item) => {
    let result = acc;
    const [prefix, key, value1, , value2, , deep] = item;
    const indent = indentSymbol.repeat(indentCount * deep - 2);
    switch (prefix) {
      case 'not_modified':
        result += `${indent}  ${key}: ${value1}\n`;
        break;
      case 'added':
        result += `${indent}+ ${key}: ${value2}\n`;
        break;
      case 'removed':
        result += `${indent}- ${key}: ${value1}\n`;
        break;
      case 'updated':
        result += `${indent}- ${key}: ${value1}\n`
                + `${indent}+ ${key}: ${value2}\n`;
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
