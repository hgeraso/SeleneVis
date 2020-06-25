const seguimiento = require('../controllers/seguimiento.controller');
const segui = require('../models/seguimiento');
const stude = require('../models/studentt');
const courseCtrl = require('./course.controller');
const studenttCtrl = require('./studentt.controller');
const indicatorCtrl = require('./indicators.controller');




const loadCtrl = {}

loadCtrl.loadCollections = async (req, res) => {
    //const bdselene= await segui.find();
    const coursesOfStudents = await segui.aggregate([
        { $group: { _id: "$username", courses: { $addToSet: "$course" } } }
    ]);
    coursesOfStudents.forEach(register => {

        const reqStudent = {
            "name": register._id,
            "courses": register.courses
        };
        console.log('viendo tipo de funcion guardar estudiante:', studenttCtrl.createStudentt(reqStudent)
            .then(v => { console.log('new student saved', v) })
            .catch(error => { console.log('el errorrr es:', error); }))
    });

    const studentsOfCourse = await segui.aggregate([      //devulve lista completa de cursos con sus respectivos estudiantes.
        { $group: { _id: "$course", usernames: { $addToSet: "$username" } } }
    ]);
    studentsOfCourse.forEach(register => {

        const reqCourse = {
            "name": register._id,
            "students": register.usernames
        };
        console.log('viendo tipo de funcion guardar curso:', courseCtrl.createCourse(reqCourse).then(v => { console.log('new course saved', v) }).catch(error => { console.log('el errorrr es:', error); }))
    });

    const bdIndicators = await stude.aggregate([{ $unwind: { path: "$courses" } }]);
    bdIndicators.forEach(register => {
        const reqInicator = {
            id_Student: register.name,
            id_Course: register.courses,
            numContenido: ' ',
            numForos: ' ',
            numExamenes: ' ',
            numSesiones: ' ',
            numVideos: ' ',
            /*  numVideosDiferentes: req.body.numVideosDiferentes,
             numRespuestas: req.body.numRespuestas,
         
             timeContenido: req.body.timeContenido,
             timeForos:req.body.timeForos,
             timeExamenes: req.body.timeExamenes,
             timeSesiones:req.body.timeSesiones,
             timeVideos:req.body.timeVideos,
             timeTotal: req.body.timeTotal */
        };
        console.log('viendo tipo de funcion guardar Indicadores:', indicatorCtrl.createIndicator(reqInicator).then(v => { console.log('new indicator saved', v) }).catch(error => { console.log('el errorrr es:', error); }))

    });

    res.json('loading');

}


module.exports = loadCtrl;
