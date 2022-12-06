const mongoose = require('mongoose');
const workflowSchema = new mongoose.Schema({
  id: String,
  name: String,
  script: {
    step: String,
    message: String,
    options: [{ key: String, value: String }],
  },
  flow: [{ option: String, action: String }],
});

const Workflow = mongoose.model('Workflow', workflowSchema);
module.exports = { Workflow };
