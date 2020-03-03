const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator'); // variable de modulo que permite validar name como valor unico 

const {Schema}= mongoose;
const  CourseSchema= new Schema({
    name: {type:String,required: true/*,unique:true*/},
    students:[String],
    

}); 
//CourseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Course', CourseSchema);