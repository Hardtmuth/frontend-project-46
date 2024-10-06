import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return (data) => JSON.stringify(data);
    case 'stylish':
      return stylish;
    default:
      return () => 'Unexpected format';
  }
};
