const React = require('react');
module.exports = {
  Prism: ({ children }) => React.createElement('pre', { className: 'prism-code' }, children)
};