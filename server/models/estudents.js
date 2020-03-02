const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({

    name:{ type: String, required: true },
    // courses: [ String ] ,
    // indicators:[ String ]

});

module.exports = mongoose.model( 'student', studentSchema );