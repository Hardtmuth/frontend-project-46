export const isFlat = (data) => (typeof data !== 'object' || data === null);

const getDiff = (data1, data2, depth = 1) => {
  const keys = Object.keys({ ...data1, ...data2 }).sort();

  const result = keys.map((key) => {
    const res = { key };

    if (data1[key] && !data2[key]) {
      res.mod = 'removed';
      res.value = data1[key];
    } else if (!data1[key] && data2[key]) {
      res.mod = 'added';
      res.value = data2[key];
    } else if (data1[key] !== data2[key]) {
      if (!isFlat(data1[key]) && !isFlat(data2[key])) {
        res.mod = 'nested_change';
        const nestedDiff = getDiff(data1[key], data2[key], depth + 1);
        res.value = nestedDiff;
        res.depth = depth;
      } else {
        res.mod = 'updated';
        res.old_value = data1[key];
        res.new_value = data2[key];
      }
    } else {
      res.mod = 'not_modify';
      res.value = data1[key];
    }
    return res;
  });
  return result;
};
export default getDiff;