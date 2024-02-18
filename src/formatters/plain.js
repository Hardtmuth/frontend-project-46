import { isFlat } from '../getDiff.js';

const simplefy = (value) => {
  if (isFlat(value)) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  }
  return '[complex value]';
};

const plain = (preparingData) => preparingData.reduce((acc, data) => {
  let result = acc;
  const actions = {
    added: `Property '${data.key}' was added with value: ${simplefy(data.value)}\n`,
    removed: `Property '${data.key}' was removed\n`,
    updated: `Property '${data.key}' was updated. From ${simplefy(data.old_value)} to ${simplefy(data.new_value)}\n`,
  };

  if (['added', 'removed', 'updated'].includes(data.mod)) {
    result += actions[data.mod];
  } else if (data.mod === 'nested_change') {
    result += plain(data.value.map((el) => ({ ...el, key: `${data.key}.${el.key}` })));
  }
  return result;
}, '');

export default plain;
