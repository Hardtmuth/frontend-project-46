import stylish from './stylish.js';
import plain from './plain.js';
import jsoner from './json.js';

export default (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'json') {
    return jsoner;
  }
  return stylish;
};
