const schema_mongoose = require('mongoose');

const TaskSchema = schema_mongoose.Schema(
    {
       id: {type: Number},
       name: { type: String },
       description: { type: String },
       duedate: { type: String }
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('assignment_collection', TaskSchema);