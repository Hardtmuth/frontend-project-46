const isSimple = (data) => (typeof data !== 'object' || data === null);

const plain = (preparingData) => {
  console.log(preparingData);
  const format = (data) => {
    console.log(data['changedType']);

    return '!';
  }
  
  const result = preparingData.map(format)
};

export default plain;
