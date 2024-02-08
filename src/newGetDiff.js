import getFormat from './formatters/index.js';

const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (origin, changed, formater, depth = 1) => {
  const format = getFormat(formater);

  const keys = (Object.keys({ ...origin, ...changed })).sort();

  const getPrepareKeyData = (key) => {
    let changedType = 'not_modified';

    let originValue = origin === undefined ? undefined : origin[key];
    let changedValue = changed === undefined ? undefined : changed[key];

    const originValueType = typeof originValue;
    const changedValueType = typeof changedValue;

    if (isFlat(originValue) || isFlat(changedValue)) {
      originValue = isFlat(originValue) ? originValue : format(getDiff(originValue, originValue, formater, depth + 1), depth + 1);
      changedValue = isFlat(changedValue) ? changedValue : format(getDiff(changedValue, changedValue, formater, depth + 1), depth + 1);
      if (originValue === undefined && changedValue !== undefined) {
        changedType = 'added';
      } else if (originValue !== undefined && changedValue === undefined) {
        changedType = 'removed';
      } else if (originValue !== changedValue) {
        changedType = 'updated';
      }
    } else {
      originValue = format(getDiff(originValue, changedValue, formater, depth + 1), depth + 1);
      changedValue = originValue;
    }
    const result = { 
      changedType,
      key,
      originValueType,
      originValue,
      changedValueType,
      changedValue,
      depth
    };
    // console.log(result);
    return result;
  };

  return keys.map(getPrepareKeyData);
};

export default getDiff;
