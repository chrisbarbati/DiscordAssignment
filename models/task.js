const mongoose = require('mongoose');

const taskSchemaObj = {
    name: { type: String, required: true },
    description: { type: String, required: false}, //Description is optional
    date: { type: Date, required: true },
    message: { type: String, required: true},
    interval: { type: Number, required: true} //Interval in minutes
};

const mongooseSchema = mongoose.Schema(taskSchemaObj);

module.exports = mongoose.model('Task', mongooseSchema);