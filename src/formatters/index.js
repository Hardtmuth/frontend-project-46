import stylish from './newStylish.js';
import plain from './newPlain.js';
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
