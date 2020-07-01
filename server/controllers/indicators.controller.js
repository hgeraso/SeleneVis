const Indicator = require('../models/indicator')

const indicatorCtrl = {}; //he definido un objeto para luego aplicar metodos.

indicatorCtrl.getIndicators = async (req, res) => {

    const indicator = await Indicator.find();
    res.json(indicator);
};

indicatorCtrl.createIndicator = async (req, res) => {

    if (req.body) {
        indicator = new Indicator(req);
        // {
        //     idCourseStudent: req.body.student + req.body.course,
        //     student: req.body.student,
        //     course: req.body.course,
        //     numVideos: req.body.numVideos,
        //     numContenido: req.body.numContenido,
        //     numForos: req.body.numForos,
        //     numExamenes: req.body.numExamenes,
        //     numSesiones: req.body.numSesiones,
        //     numSesionesDif: req.body.numSesiones,
        //     numVideosDiferentes: req.body.numVideosDiferentes,
        //     timeExam: req.body.TimeExam,
        //     timeVideos: req.body.TimeVideos,
        //     timeOthers: req.body.TimeOthers,
        //     /* numRespuestas: req.body.numRespuestas,            
        //     timeContenido: req.body.timeContenido,
        //     timeForos:req.body.timeForos,
        //     timeSesiones:req.body.timeSesiones,
        //     timeTotal: req.body.timeTotal */
        // }
        await indicator.save();
        res.json('saved');
        return 'indicator saved sussesfuly';
    }
    else {
        indicator = new Indicator(req);

        // await indicator.update();
        await indicator.save()
        return 'indicator saved sussesfuly';

        //     /*numRespuestas: req.body.numRespuestas,            
        //     timeContenido: req.body.timeContenido,
        //     timeForos:req.body.timeForos,
        //     timeExamenes: req.body.timeExamenes,
        //     timeSesiones:req.body.timeSesiones,
        //     timeVideos:req.body.timeVideos,
        //     timeTotal: req.body.timeTotal */
        // }
    }

}

indicatorCtrl.getIndicatorsByCourse = async (req, res) => {
    const indicatorsBycourse = await Indicator.find({ "course": req.body.course });
    res.json(indicatorsBycourse)
}


module.exports = indicatorCtrl;
