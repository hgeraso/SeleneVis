const mongoose = require('mongoose');
const course = require('./course');
const {Schema}= mongoose;

const  indicatorSchema= new Schema({
    
    idCourseStudent:String,
    student:String,
    course:String,
    numVideos:String,
    numContenido:String,
    numForos:String,
    numExamenes: String,
    numSesiones: String,
    numSesionesDif: String,
    numVideosDiferentes: String,
    timeExam: String,
    timeVideos:String,
    timeOthers:String,
    
    // timeForos:String,
    // numOtros:String
    // timeContenido: {type:String,required: true/*,unique:true*/},
    // timeSesiones: {type:String,required: true/*,unique:true*/},
    // timeTotal: String,
    // numRespuestas: {type:String,required: true/*,unique:true*/},
}); 
//CourseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Indicator', indicatorSchema);