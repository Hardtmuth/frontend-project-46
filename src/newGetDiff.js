const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (origin, changed, depth = 1) => {
  const keys = (Object.keys({ ...origin, ...changed })).sort();

  const getPrepareKeyData = (key) => {

    let changedType = 'not_modified';

    let originValue = origin === undefined ? undefined : origin[key];
    let changedValue = changed === undefined ? undefined : changed[key];

    const originValueType = typeof originValue;
    const changedValueType = typeof changedValue;

    if (isFlat(originValue) || isFlat(changedValue)) {
      originValue = isFlat(originValue)
        ? originValue
        : getDiff(originValue, originValue, depth + 1);
      changedValue = isFlat(changedValue)
        ? changedValue
        : getDiff(changedValue, changedValue, depth + 1);

      if (originValue === undefined && changedValue !== undefined) {
        changedType = 'added';
      } else if (originValue !== undefined && changedValue === undefined) {
        changedType = 'removed';
      } else if (originValue !== changedValue) {
        changedType = 'updated';
      }

    } else {
      originValue = getDiff(originValue, changedValue, depth + 1);
      changedValue = 'same';
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

    return result;
  };

  return keys.map(getPrepareKeyData);
};

export default getDiff;
