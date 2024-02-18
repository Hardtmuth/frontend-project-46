import _ from 'lodash';

export const isFlat = (data) => typeof data !== 'object' || data === null;

const getDiff = (data1, data2, depth = 1) => {
  const keys = _.sortBy(_.keys(_.assign({}, data1, data2)));

  const result = _.map(keys, (key) => {
    const stringifiedData1 = JSON.stringify(data1[key]);
    const stringifiedData2 = JSON.stringify(data2[key]);

    if (stringifiedData1 && !stringifiedData2) {
      return {
        key,
        mod: 'removed',
        value: data1[key],
      };
    }
    if (!stringifiedData1 && stringifiedData2) {
      return {
        key,
        mod: 'added',
        value: data2[key],
      };
    }
    if (stringifiedData1 !== stringifiedData2) {
      if (!isFlat(data1[key]) && !isFlat(data2[key])) {
        return {
          key,
          mod: 'nested_change',
          value: getDiff(data1[key], data2[key], depth + 1),
          depth,
        };
      }
      return {
        key,
        mod: 'updated',
        old_value: data1[key],
        new_value: data2[key],
      };
    }
    return {
      key,
      mod: 'not_modify',
      value: data1[key],
    };
  });
  return result;
};

export default getDiff;
