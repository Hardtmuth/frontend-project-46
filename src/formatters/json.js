const jsoner = (data) => {
  const result = data.map(el => JSON.stringify(el));
  console.log(result);
  return result;
};

export default jsoner;
