const mongoose = require('mongoose');

const SubmitTaskSchema = new mongoose.Schema({
  taskid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task'
  },
  employeename: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SubmitTask', SubmitTaskSchema);
