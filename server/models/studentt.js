const mongoose = require('mongoose');
const {Schema}= mongoose;

const  StudentSchema= new Schema({
    
    name: {type:String,required: true},
    courses:[String],
    

}); 

module.exports = mongoose.model('Studentt', StudentSchema);