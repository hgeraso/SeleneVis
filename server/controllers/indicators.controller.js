const Indicator = require('../models/indicator')

const indicatorCtrl={}; //he definido un objeto para luego aplicar metodos.

indicatorCtrl.getIndicators = async(req,res)=>{
    
    const indicator= await Indicator.find();
    res.json(indicator);
};

indicatorCtrl.createIndicator =  async(req,res)=>{
    
    if(req.body){ 
        indicator = new Indicator(
            {   
                id_Student:req.body.id_Student,
                id_Course:req.body.id_Course,
                numContenido: req.body.numContenido,
                numForos:req.body.numForos,
                numExamenes: req.body.numExamenes,
                numSesiones: req.body.numSesiones,
                numVideos:req.body.numVideos,
                numVideosDiferentes: req.body.numVideosDiferentes
                /* numRespuestas: req.body.numRespuestas,
            
                timeContenido: req.body.timeContenido,
                timeForos:req.body.timeForos,
                timeExamenes: req.body.timeExamenes,
                timeSesiones:req.body.timeSesiones,
                timeVideos:req.body.timeVideos,
                timeTotal: req.body.timeTotal */
            });
           
        await indicator.save();
        res.json('saved');
        return 'indicator saved sussesfuly';
      
    }
    else{
        indicator = new Indicator(
            {   
                id_Student:req.id_Student,
                id_Course:req.id_Course,
                numContenido: req.numContenido,
                numForos:req.numForos,
                numExamenes: req.numExamenes,
                numSesiones: req.numSesiones,
                numVideos:req.numVideos,
                numVideosDiferentes: req.numVideosDiferentes
                /*numRespuestas: req.body.numRespuestas,
            
                timeContenido: req.body.timeContenido,
                timeForos:req.body.timeForos,
                timeExamenes: req.body.timeExamenes,
                timeSesiones:req.body.timeSesiones,
                timeVideos:req.body.timeVideos,
                timeTotal: req.body.timeTotal */
            });
           
        await indicator.save();
        return 'indicator saved sussesfuly';
      
}

}



module.exports=indicatorCtrl;
