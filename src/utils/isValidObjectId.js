const { ObjectID } = require("mongodb");

//Todo: refactor
const isValidObjectId = (id) => {
  const idToString = typeof id === String ? id : String(id);
  const idInstance = new ObjectID(idToString);

  return String(idInstance) === id;
};

module.exports = isValidObjectId;
