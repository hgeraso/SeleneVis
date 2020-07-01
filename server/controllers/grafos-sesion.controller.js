const seguimiento = require('../models/seguimiento');
const grafosSesionController = {};

grafosSesionController.getStudentSesion = async (req, res)=>{
    const course = req.body.course;
    const student = req.body.student;
    
    const sesions = await seguimiento.find( { course: course, username: student } ).distinct('session');

    res.json({
        sesions
    })
}


module.exports = grafosSesionController;