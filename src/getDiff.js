import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (data1, data2, formater, depth = 1) => {
  const format = formater === 'stylish' ? stylish : plain;

  const keys = (Object.keys({ ...data1, ...data2 })).sort();

  const getPrepareKeyData = (key) => {
    let prefix = 'not_modified';

    let val1 = data1 === undefined ? undefined : data1[key];
    let val2 = data2 === undefined ? undefined : data2[key];

    const complexVal1 = (!isFlat(val1)) ? 'obj' : '';
    const complexVal2 = (!isFlat(val2)) ? 'obj' : '';

    if (isFlat(val1) || isFlat(val2)) {
      val1 = isFlat(val1) ? val1 : format(getDiff(val1, val1, formater, depth + 1), depth + 1);
      val2 = isFlat(val2) ? val2 : format(getDiff(val2, val2, formater, depth + 1), depth + 1);
      if (val1 === undefined && val2 !== undefined) {
        prefix = 'added';
      } else if (val1 !== undefined && val2 === undefined) {
        prefix = 'removed';
      } else if (val1 !== val2) {
        prefix = 'updated';
      }
    } else {
      val1 = format(getDiff(val1, val2, formater, depth + 1), depth + 1);
      val2 = val1;
    }
    const result = [prefix, key, val1, complexVal1, val2, complexVal2, depth];
    return result;
  };

  return keys.map(getPrepareKeyData);
};

export default getDiff;
