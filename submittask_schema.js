const schema_mongoose = require('mongoose');

const SubmitSchema = schema_mongoose.Schema(
    {
       assignmentid: {type: Number},
       studentname: { type: String },
       description: { type: String },
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('submit_collection', SubmitSchema);