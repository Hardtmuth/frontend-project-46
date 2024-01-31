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

  const prepare = keys.map((item) => {
    const result = [0, item];
    const val1 = data1 === undefined ? undefined : data1[item];
    const val2 = data2 === undefined ? undefined : data2[item];

    if (val1 !== val2) {
      result[0] = 1;
    }
    return [...result, val1, val2];
  });
  return prepare;
};

console.log(getDiff(someData1, someData2));
