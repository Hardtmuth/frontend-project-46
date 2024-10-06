import yaml from 'js-yaml';

const fomatters = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
  yaml: (data) => yaml.load(data),
};

export default (fileData, format) => fomatters[format](fileData);
