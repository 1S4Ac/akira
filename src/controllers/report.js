const Report = require('../schema/Report');

const list = (req, res) => {};

const add = async (req, res) => {
  const { assignedTo, assignments, createdBy, description, status, title } =
    req.body;

  try {
    const report = await Report.create({
      assignedTo,
      assignments,
      createdBy,
      description,
      status,
      title,
    });
    res.status(200).json({report})
  } catch (err) {
    res.status(500).json({message: "Internal server error", err})
  }
};

const get = (req, res) => {};

const change = (req, res) => {};

const remove = (req, res) => {};

module.exports = {
  list,
  add,
  get,
  change,
  remove,
};
