import _ from 'lodash';
import stylish from './stylish.js';

const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (data1, data2, deep = 1) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  const getPrepareData = (key) => {
    let prefix = ' ';
    let v1 = data1 === undefined ? undefined : data1[key];
    let v2 = data2 === undefined ? undefined : data2[key];

    const prepv1 = isFlat(v1) ? v1 : stylish(getDiff(v1, v1, deep + 1), deep + 1);
    const prepv2 = isFlat(v2) ? v2 : stylish(getDiff(v2, v2, deep + 1), deep + 1);

    if ((isFlat(v1) && isFlat(v2)) || (!isFlat(v1) && isFlat(v2)) || (isFlat(v1) && !isFlat(v2))) {
      v1 = prepv1;
      v2 = prepv2;
      if (v1 === undefined && v2 !== undefined) {
        prefix = '+';
      } else if (v1 !== undefined && v2 === undefined) {
        prefix = '-';
      } else if (v1 !== v2) {
        prefix = '±';
      }
    } else {
      v1 = stylish(getDiff(v1, v2, deep + 1), deep + 1);
      v2 = v1;
    }

    return [prefix, key, v1, v2, deep];
  };

  return keys.map(getPrepareData);
};

export default getDiff;
