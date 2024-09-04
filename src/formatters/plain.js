import _ from 'lodash';

const simplefy = (value) => {
  if (!_.isPlainObject(value)) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  }
  return '[complex value]';
};

const plain = (preparingData) => preparingData.reduce((acc, data) => {
  const actions = {
    added: `Property '${data.key}' was added with value: ${simplefy(data.value)}\n`,
    removed: `Property '${data.key}' was removed\n`,
    updated: `Property '${data.key}' was updated. From ${simplefy(data.value)} to ${simplefy(data.new_value)}\n`,
  };

  if (['added', 'removed', 'updated'].includes(data.mod)) {
    return `${acc}${actions[data.mod]}`;
  }
  if (data.mod === 'nested_change') {
    return `${acc}${plain(data.value.map((el) => ({ ...el, key: `${data.key}.${el.key}` })))}`;
  }
  return acc;
}, '');

export default plain;
