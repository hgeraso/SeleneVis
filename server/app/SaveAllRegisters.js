const seguimiento = require('../models/seguimiento');;
const statics = require('./GetStatics');
const indicatorController = require('../controllers/indicators.controller');
const studentt = require('../models/studentt');
const SaveInfoDB = {};
let staticsToSave = {};

SaveInfoDB.saveInfo = async () => {
    console.log("Estudiantes de Cursos")

    // get all courses :P
    const courses = await seguimiento.distinct("course");
    // const course = courses[2];
    courses.forEach(async (course,index) => {

        // console.log("analizanfo el curso que no guarda nada", course)
        // flag is used to update if registre already exist
        var exist = false;
        // get student by courses :)
        // const student = students[3]
        const students = await seguimiento.find({ course: course }).distinct('username');
        // console.log("Init Update, estudiantes son", students);

        students.forEach(async (student) => {
            // console.log("analizando el estudiante", student)
            staticsToSave = await statics.getStatistics({ course: course, student: student })

            // intent save document
            await indicatorController.createIndicator({ ...staticsToSave, student, course })
                .then(res => console.log("estuden saved", res))
                .catch(err => {
                    if (err.code == 11000) {
                        console.log("el registro ya existe******");
                        exist = true;
                    }
                })

            // intent update document
            if (exist) {
                // console.log("atualizar registro");
                await indicatorController.UpdateIndicator({ ...staticsToSave, student, course })
                    .then(res => {
                        console.log("Actualizacion completa");
                        exist = false;
                    })
                    .catch(err => console.log("ocurrio un error actualizando", err))

            }
        })
       if (index==(courses.length -1 )){
        console.log("finished Update");
       }

    })
 console.log("cierra funcion de obtener estadisticas");
}


module.exports = SaveInfoDB;