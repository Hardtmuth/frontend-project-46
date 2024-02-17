const plain = (preparingData) => {
  const format = (acc, data) => {
    let result = acc;

    const actions = {
      added: `Property '${data.key}' was added with value: ${data.value}\n`,
      removed: `Property '${data.key}' was removed\n`,
      updated: `Property '${data.key}' was updated. From ${data.old_value} to ${data.new_value}\n`,
    };

    const cb = (el) => {
      const res = { ...el };
      res.key = `${data.key}.${res.key}`;
      return res;
    };

    switch (data.mod) {
      case 'added':
      case 'removed':
      case 'updated':
        result += actions[data.mod];
        break;
      case 'not_modify':
        result += '';
        break;
      case 'nested_change':
        result += plain([...data.value].map(cb));
        break;
      default:
        return null;
    }
    return result;
  };

  return preparingData.reduce(format, '');
};

export default plain;
