const mongoose = require('mongoose');
const {Schema}= mongoose;
const  indicatorSchema= new Schema({
    id_Student:String,
    id_Course:String,
    numContenido: {type:String,required: true/*,unique:true*/},
    numForos:String,
    numExamenes: String,
    numSesiones: {type:String,required: true/*,unique:true*/},
    numVideos:String,
    // numVideosDiferentes: String,
    // numRespuestas: {type:String,required: true/*,unique:true*/},

    // timeContenido: {type:String,required: true/*,unique:true*/},
    // timeForos:String,
    // timeExamenes: String,
    // timeSesiones: {type:String,required: true/*,unique:true*/},
    // timeVideos:String,
    // timeTotal: String,
    // numOtros:String
}); 
//CourseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Indicator', indicatorSchema);