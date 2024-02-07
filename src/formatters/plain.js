const isSimple = (data) => (typeof data === 'boolean' || typeof data === 'number' || data === null);

const plain = (preparingData) => {
  const getStylishString = (acc, item) => {
    let result = acc;
    const [prefix, key, value1, cmplVal1, value2, cmplVal2] = item;
    switch (prefix) {
      case 'not_modified':
        result += (value1.toString().startsWith('Property'))
          ? `${value1.split('\n').map((el) => (el.replace("'", `'${key}.`))).join('\n')}\n`
          : '';
        break;
      case 'added':
        if (isSimple(value2)) {
          result += `Property '${key}' was added with value: ${value2}\n`;
        } else if (value2 === '') {
          result += `Property '${key}' was added with value: [complex value]\n`;
        } else {
          result += `Property '${key}' was added with value: '${value2}'\n`;
        }
        break;
      case 'removed':
        result += `Property '${key}' was removed\n`;
        break;
      case 'updated':
        if (isSimple(value1)) {
          result += `Property '${key}' was updated. From ${value1} to ${value2}\n`;
        } else if (value1 === '' && cmplVal1 === 'obj') {
          result += `Property '${key}' was updated. From [complex value] to '${value2}'\n`;
        } else if (value2 === '' && cmplVal2 === 'obj') {
          result += `Property '${key}' was updated. From ${value1} to [complex value]\n`;
        } else {
          result += `Property '${key}' was updated. From '${value1}' to '${value2}'\n`;
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
