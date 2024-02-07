const plain = (preparingData) => {
  const getStylishString = (acc, item) => {
    let result = acc;
    const complex = '[complex value]';
    const [prefix, key, value1, cmplVal1, value2, cmplVal2] = item;
    switch (prefix) {
      case 'not_modified':
        if (value1.toString().startsWith('Property')) {
          result += `${value1.split('\n').map((el) => (el.replace("'", `'${key}.`))).join('\n')}\n`;
        }
        break;
      case 'added':
        if (typeof value2 === 'boolean' || typeof value2 === 'number' || value2 === null) {
          result += `Property '${key}' was added with value: ${value2}\n`;
        } else if (value2 === '') {
          result += `Property '${key}' was added with value: ${complex}\n`;
        } else {
          result += `Property '${key}' was added with value: '${value2}'\n`;
        }
        break;
      case 'removed':
        result += `Property '${key}' was removed\n`;
        break;
      case 'updated':
        if (typeof value1 === 'boolean' || typeof value2 === 'number' || value1 === null) {
          result += `Property '${key}' was updated. From ${value1} to ${value2}\n`;
        } else if (value1 === '' && cmplVal1 === 'obj') {
          result += `Property '${key}' was updated. From ${complex} to '${value2}'\n`;
        } else if (value2 === '' && cmplVal2 === 'obj') {
          result += `Property '${key}' was updated. From ${value1} to '${complex}'\n`;
        } else {
          result += `Property '${key}' was updated. From '${value1}' to '${value2}'\n`;
        }
        break;
      default:
        return null;
    }
    return result;
  };
  const result = `${preparingData.reduce(getStylishString, '')}`;
  return result.trimEnd();
};

export default plain;
