const stylish = (preparingData, spaceSymbol = ' ', spaceCount = 4) => {
  const result = preparingData.map((item) => {
    const [prefix, key, value1, value2, deep] = item;
    const space = spaceSymbol.repeat(spaceCount * deep - 2);
    // console.log('deep is: ', deep, '\nspace is: ', space.length);
    switch (prefix) {
      case ' ':
        return `${space}${prefix} ${key}: ${value1}\n`;
      case '+':
        return `${space}${prefix} ${key}: ${value2}\n`;
      case '-':
        return `${space}${prefix} ${key}: ${value1}\n`;
      case '±':
        return `${space}- ${key}: ${value1}\n`
             + `${space}+ ${key}: ${value2}\n${spaceSymbol.repeat(spaceCount * deep - spaceCount)}`;
      default:
        return null;
    }
  });
  // console.log(result);

  return `{\n${result.join('')}}`;
};

export default stylish;
