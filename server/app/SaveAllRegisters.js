const seguimiento = require('../models/seguimiento');
const statics = require('../controllers/statistics.controller')
const SaveInfoDB = {}

SaveInfoDB.getCourse = async() => {
    console.log("Estudiantes de Cursos")

    const courses = await seguimiento.distinct("course");
    const students = await seguimiento.find({ course: courses[0] }).distinct('username');
    statics.getStatistics({course:courses[0], student:students[2]}, (res)=> res)
    .then( res => console.log(res))
    .catch( err => console.log(err, "ocurrio un error") )
}



module.exports = SaveInfoDB;