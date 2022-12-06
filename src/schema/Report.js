const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    createdBy: {
      type: String
    },
    attachment: {
      type: [Schema.Types.ObjectId],
      ref: 'Attachment',
      default: [],
    },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['open', 'canceled', 'resolved'],
      default: 'open',
    },
    assignedTo: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model('Report', reportSchema);
module.exports = {
  Report
}
