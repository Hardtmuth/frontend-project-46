import { isFlat } from '../getDiff.js';

const plain = (preparingData) => {
  const format = (acc, data) => {
    let result = acc;
    const {
      changedType,
      key,
      originValue,
      changedValue,
    } = data;

    const actions = {
      added: `Property '${key}' was added with value: ${changedValue}\n`,
      addedStr: `Property '${key}' was added with value: '${changedValue}'\n`,
      addedCplx: `Property '${key}' was added with value: [complex value]\n`,
      removed: `Property '${key}' was removed\n`,
      updated: `Property '${key}' was updated. From ${originValue} to ${changedValue}\n`,
      updatedStr: `Property '${key}' was updated. From '${originValue}' to '${changedValue}'\n`,
      updatedCplx: `Property '${key}' was updated. From [complex value] to '${changedValue}'\n`,
    };

    const cb = (el) => {
      const res = { ...el };
      res.key = `${key}.${res.key}`;
      return res;
    };

    switch (changedType) {
      case 'added':
        if (!isFlat(changedValue)) {
          result += actions.addedCplx;
        } else if (typeof changedValue === 'string') {
          result += actions.addedStr;
        } else {
          result += actions[changedType];
        }
        break;
      case 'removed':
        result += actions[changedType];
        break;
      case 'updated':
        if (!isFlat(changedValue)) {
          result += plain(changedValue);
        } else if (typeof changedValue === 'string') {
          result += isFlat(originValue) ? actions.updatedStr : actions.updatedCplx;
        } else {
          result += actions[changedType];
        }
        break;
      case 'not_modified':
        if (!isFlat(originValue)) {
          result += plain([...originValue].map(cb));
        } else {
          result += '';
        }
        break;
      default:
        return null;
    }
    return result;
  };

  return preparingData.reduce(format, '');
};

export default plain;
