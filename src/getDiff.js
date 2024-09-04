import _ from 'lodash';

const getDiff = (data1, data2, depth = 1) => {
  const keys = _.sortBy(_.keys(_.assign({}, data1, data2)));

  const result = _.map(keys, (key) => {
    const stringifiedData1 = JSON.stringify(data1[key]);
    const stringifiedData2 = JSON.stringify(data2[key]);

    const obj = {
      key,
      mod: 'not_modify',
      value: data1[key],
    };

    if (stringifiedData1 && !stringifiedData2) {
      obj.mod = 'removed';
    } else if (!stringifiedData1 && stringifiedData2) {
      obj.mod = 'added';
      obj.value = data2[key];
    } else if (stringifiedData1 !== stringifiedData2) {
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        obj.mod = 'nested_change';
        obj.value = getDiff(data1[key], data2[key], depth + 1);
        obj.depth = parseInt(depth, 10);
      } else {
        obj.mod = 'updated';
        obj.value = data1[key];
        obj.new_value = data2[key];
      }
    }
    return obj;
  });
  return result;
};

export default getDiff;
