function createLib (execlib) {
  'use strict';

  return require('./libindex')(execlib);
}
module.exports = createLib;
