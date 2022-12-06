const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: {
    type: String,
  },
});
const User = mongoose.model('User', userSchema);
module.exports = { User };
