const someData1 = {
  a: 1,
  b: 2,
  c: 3,
};
const someData2 = {
  a: 1,
  b: 3,
  d: 4,
};

const getDiff = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });

  const prepare = keys.map((key) => {
    let prefix = ' ';
    const val1 = data1 === undefined ? undefined : data1[key];
    const val2 = data2 === undefined ? undefined : data2[key];

    if (val1 === undefined && val2 !== undefined) {
      prefix = '+';
    } else if (val1 !== undefined && val2 === undefined) {
      prefix = '-';
    } else if (val1 !== val2) {
      prefix = '±';
    }

    return [prefix, key, val1, val2];
  });

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
               + `${space}+ ${key}: ${value2}\n`;
        default:
          return null;
      }
    });
    console.log(result);

    return `{\n${result.join('')}}`;
  };

  return stylish(prepare);
};

console.log(getDiff(someData1, someData2));
