import stylish from './stylish.js';
import plain from './plain.js';
import jsoner from './json.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return jsoner;
    case 'stylish':
      return stylish;
    default:
      return () => 'Unexpected format';
  }
};
