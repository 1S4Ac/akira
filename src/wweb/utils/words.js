const sinonimo = require('sinonimo');

const getSynonymes = async (term = "") => {
  return await sinonimo(term);
};

const contains = (array = [], message = '') => {
  try {
    const contains = array.includes(message);
    if (!contains) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw new Error('Erro interno utils/words::contains', { err });
  }
};

const normalize = (str = '') => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const getSentenceClass = async (word) => {};

module.exports = {
  getSynonymes,
  contains,
  getSentenceClass,
  normalize,
};
