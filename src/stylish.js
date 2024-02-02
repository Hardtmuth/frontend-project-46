const stylish = (preparingData, spaceSymbol = ' ', spaceCount = 2) => {
  const space = spaceSymbol.repeat(spaceCount);
  const result = preparingData.map((item) => {
    const [prefix, key, value1, value2] = item;
    switch (prefix) {
      case ' ':
        return `${space}${prefix} ${key}: ${value1}\n`;
      case '+':
        return `${space}${prefix} ${key}: ${value2}\n`;
      case '-':
        return `${space}${prefix} ${key}: ${value1}\n`;
      case '±':
        return `${space}- ${key}: ${value1}\n`
             + `${space}+ ${key}: ${value2}\n${spaceSymbol.repeat(spaceCount / 3)}`;
      default:
        return null;
    }
  });
  console.log(result);

  return `{\n${result.join('')}}`;
};

export default stylish;
