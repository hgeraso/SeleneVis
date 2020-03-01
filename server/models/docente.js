const mongoose = require('mongoose');
const {Schema}= mongoose;
const  DocenteSchema= new Schema({
    name: {type:String,required: true},
    course:{type:String, required:true},
    cedula:{type:Number, required:true},
    password:{type: String,required:true},
    credencial:{type:String}


}); 

module.exports = mongoose.model('Docente', DocenteSchema);