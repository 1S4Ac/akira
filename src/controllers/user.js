const { User } = require('../schema/User');

const list = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

const get = async (req, res) => {};

const add = async (req, res) => {
  const { email, firstName, lastName, phone, username } = req.body;
  console.log({ email, firstName, lastName, phone, username });
  try {
    const user = new User({
      email,
      firstName,
      lastName,
      phone,
      username,
    });

    const created = await user.save();
    if (!created) {
      res.status(400).json({ message: 'Não foi possível criar o usuário' });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const change = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  list,
  get,
  add,
  change,
  remove,
};
