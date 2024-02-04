import _ from 'lodash';
import stylish from './stylish.js';

const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (data1, data2, deep = 1) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  const cb = (key) => {
    let prefix = ' ';
    let val1 = data1 === undefined ? undefined : data1[key];
    let val2 = data2 === undefined ? undefined : data2[key];

    const someFlat = (
      (isFlat(val1) && isFlat(val2))
      || (!isFlat(val1) && isFlat(val2))
      || (isFlat(val1) && !isFlat(val2))
    );

    if (someFlat) {
      if (val1 === undefined && val2 !== undefined) {
        prefix = '+';
        val1 = isFlat(val1) ? val1 : stylish(getDiff(val1, val1, deep + 1), deep + 1);
        val2 = isFlat(val2) ? val2 : stylish(getDiff(val2, val2, deep + 1), deep + 1);
      } else if (val1 !== undefined && val2 === undefined) {
        prefix = '-';
        val1 = isFlat(val1) ? val1 : stylish(getDiff(val1, val1, deep + 1), deep + 1);
        val2 = isFlat(val2) ? val2 : stylish(getDiff(val2, val2, deep + 1), deep + 1);
      } else if (val1 !== val2) {
        prefix = '±';
        val1 = isFlat(val1) ? val1 : stylish(getDiff(val1, val1, deep + 1), deep + 1);
        val2 = isFlat(val2) ? val2 : stylish(getDiff(val2, val2, deep + 1), deep + 1);
      }
    } else {
      // prefix = ' ';
      val1 = stylish(getDiff(val1, val2, deep + 1), deep + 1);
      val2 = val1;
    }
    const res = [prefix, key, val1, val2, deep];
    // console.log(res);
    return res;
  };

  const prepare = keys.map(cb);

  return prepare;
};

export default getDiff;
