const mongoose = require('mongoose');
const {Schema}= mongoose;
const  CourseSchema= new Schema({
    name: {type:String,required: true},
    students:[String],
    

}); 

module.exports = mongoose.model('Course', CourseSchema);