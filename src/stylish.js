const stylish = (preparingData, dept = 1, spaceSymbol = ' ', spaceCount = 4) => {
  const cb = (acc, item) => {
    let res = acc;
    const [prefix, key, value1, value2, deep] = item;
    const space = spaceSymbol.repeat(spaceCount * deep - 2);
    switch (prefix) {
      case ' ':
        res += `${space}${prefix} ${key}: ${value1}\n`;
        break;
      case '+':
        res += `${space}${prefix} ${key}: ${value2}\n`;
        break;
      case '-':
        res += `${space}${prefix} ${key}: ${value1}\n`;
        break;
      case '±':
        res += `${space}- ${key}: ${value1}\n`
             + `${space}+ ${key}: ${value2}\n`;
        break;
      default:
        return null;
    }
    return res;
  };

  const result = preparingData.reduce(cb, '');
  const endSpace = dept * spaceCount - spaceCount;
  // console.log(`{\n${result.join('')}}`);

  // return `{\n${result.join('')}}`;
  return `{\n${result}${spaceSymbol.repeat(endSpace)}}`;
};

export default stylish;
