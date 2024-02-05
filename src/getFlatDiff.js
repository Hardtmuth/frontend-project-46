import stylish from './stylish.js';

const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (data1, data2, deep = 1) => {
  const keys = (Object.keys({ ...data1, ...data2 })).sort();

  const getPrepareKeyData = (key) => {
    let prefix = ' ';
    let val1 = data1 === undefined ? undefined : data1[key];
    let val2 = data2 === undefined ? undefined : data2[key];

    const prepVal1 = isFlat(val1) ? val1 : stylish(getDiff(val1, val1, deep + 1), deep + 1);
    const prepVal2 = isFlat(val2) ? val2 : stylish(getDiff(val2, val2, deep + 1), deep + 1);

    if (isFlat(val1) || isFlat(val2)) {
      val1 = prepVal1;
      val2 = prepVal2;
      if (val1 === undefined && val2 !== undefined) {
        prefix = '+';
      } else if (val1 !== undefined && val2 === undefined) {
        prefix = '-';
      } else if (val1 !== val2) {
        prefix = '±';
      }
    } else {
      val1 = stylish(getDiff(val1, val2, deep + 1), deep + 1);
      val2 = val1;
    }

    return [prefix, key, val1, val2, deep];
  };

  return keys.map(getPrepareKeyData);
};

export default getDiff;
