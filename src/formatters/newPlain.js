const isSimple = (data) => (typeof data === 'boolean' || typeof data === 'number' || data === null);

const plain = (preparingData) => {
  const getStylishString = (acc, item) => {
    let result = acc;
    const [prefix, key, cmplVal1, value1, cmplVal2, value2] = Object.keys(item);
    // const [prefix, key, , value1, , value2, deep] = Object.keys(item);
    switch (item[prefix]) {
      case 'not_modified':
        result += (item[value1].toString().startsWith('Property'))
          ? `${item[value1].split('\n').map((el) => (el.replace("'", `'${item[key]}.`))).join('\n')}\n` : '';
        break;
      case 'added':
        if (isSimple(item[value2])) {
          result += `Property '${item[key]}' was added with value: ${item[value2]}\n`;
        } else if (item[value2] === '') {
          result += `Property '${item[key]}' was added with value: [complex value]\n`;
        } else {
          result += `Property '${item[key]}' was added with value: '${item[value2]}'\n`;
        }
        break;
      case 'removed':
        result += `Property '${item[key]}' was removed\n`;
        break;
      case 'updated':
        if (isSimple(item[value1])) {
          result += `Property '${item[key]}' was updated. From ${item[value1]} to ${item[value2]}\n`;
        } else if (item[value1] === '' && item[cmplVal1] === 'object') {
          result += `Property '${item[key]}' was updated. From [complex value] to '${item[value2]}'\n`;
        } else if (item[value2] === '' && item[cmplVal2] === 'obj') {
          result += `Property '${item[key]}' was updated. From ${item[value1]} to [complex value]\n`;
        } else {
          result += `Property '${item[key]}' was updated. From '${item[value1]}' to '${item[value2]}'\n`;
        }
        break;
      default:
        return null;
    }
    return result;
  };
  return `${preparingData.reduce(getStylishString, '').trimEnd()}`;
};

export default plain;
