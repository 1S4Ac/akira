const isAllowed = (array = [""], element = "") => {
  return array.includes(element)
};

module.exports = {
  isAllowed,
};
