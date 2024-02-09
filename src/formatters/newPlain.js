const isSimple = (data) => (typeof data !== 'object' || data === null);

const plain = (preparingData) => {
  const format = (acc, data) => {
    let result = acc;
    const { changedType, key, originValue, changedValue } = data;

    console.log([changedType, key, originValue, changedValue]);

    const actions = {
      added: `Property '${key}' was added with value: ${changedValue}\n`,
      removed: `Property '${key}' was removed\n`,
      updated: `Property '${key}' was updated. From ${originValue} to ${changedValue}\n`,
    };

    switch (changedType) {
      case 'added':
        result += actions.action;
        break;
      case 'removed':
        result += actions.action;
        break;
      case 'updated':
        if (!isSimple(changedValue)) {
          console.log('now key is: ', changedValue[0].key);
          const newKey = `${key}.${changedValue[0].key}`;
          console.log('newKey is: ', newKey);
          const newVal = [{...changedValue[0]}];
          console.log('updated1 newWal is: ', newVal);
          newVal[0].key = newKey;
          console.log('updated2 newVal is: ', newVal);
          console.log('updated key is: ', changedValue[0].key);
          result += plain(newVal);
        } else {
          result += actions.action;
        }
        break;
      case 'not_modified':
        if (!isSimple(originValue)) {
          console.log('now key is: ', originValue[0].key);
          const newKey = `${key}.${originValue[0].key}`;
          console.log('newKey is: ', newKey);
          const newVal = [{...originValue[0]}];
          console.log('nm1 newWal is: ', newVal);
          newVal[0].key = newKey;
          console.log('nm2 newVal is: ', newVal);
          console.log('updated key is: ', originValue[0].key);
          result += plain(newVal);
        }
        result += '';
        break;
      default:
        return null;
    }
    console.log(result);
    return result;
  };

  return preparingData.reduce(format, '');

  /* console.log(preparingData);
  console.log(actions.added);
  const format = (data) => {
    console.log(data);

    return '!';
  };

  const result = preparingData.map(format);
  return result; */
};

export default plain;
