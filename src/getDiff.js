import _ from 'lodash';

const comparingData = (dataSet1, dataSet2) => {
  if (dataSet1 && !dataSet2) {
    return 'stageOne';
  }
  if (!dataSet1 && dataSet2) {
    return 'stageTwo';
  }
  if (dataSet1 !== dataSet2) {
    return 'notEqual';
  }
  return 'equal';
};

const getDiff = (data1, data2, depth = 1) => {
  const keys = _.sortBy(_.keys(_.assign({}, data1, data2)));

  return _.map(keys, (key) => {
    const stage = comparingData(JSON.stringify(data1[key]), JSON.stringify(data2[key]));

    switch (stage) {
      case 'stageOne':
        return { key, mod: 'removed', value: data1[key] };
      case 'stageTwo':
        return { key, mod: 'added', value: data2[key] };
      case 'notEqual':
        if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
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
          value: data1[key],
          new_value: data2[key],
        };
      default:
        return { key, mod: 'not_modify', value: data1[key] };
    }
  });
};

export default getDiff;
