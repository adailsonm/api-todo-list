const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  description: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
  finished_at: { Type: Date }
})

module.exports = model("Task", taskSchema)
