const seguimiento = require('../models/seguimiento');;
const statics = require('./GetStatics');
const indicatorController = require('../controllers/indicators.controller');
const studentt = require('../models/studentt');
const SaveInfoDB = {};
let staticsToSave = {};

SaveInfoDB.saveInfo = async () => {

    // get all courses :P
    const courses = await seguimiento.distinct("course");

    let docsInserteds = 0;
    let totalStudents = 0;

    console.log("updating...");
    courses.forEach(async (course) => {

        const students = await seguimiento.find({ course: course }).distinct('username');
        totalStudents += students.length;

        students.forEach(async (student) => {

            staticsToSave = await statics.getStatistics({ course: course, student: student })

            // intent save document
            await indicatorController.createIndicator(staticsToSave)
                .then(res => {
                    docsInserteds++;
                    console.log(res, docsInserteds, totalStudents)
                })
                .catch((err) => {
                    console.log("ocurrio un problema guardando el doc", err)
                })
                
            if (docsInserteds === totalStudents) {
                console.log(`updated ${docsInserteds} documents`)
            }
        })


    })

}


module.exports = SaveInfoDB;