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
                student:req.body.student,
                course:req.body.course,
                numVideos:req.body.numVideos,
                numContenido: req.body.numContenido,
                numForos:req.body.numForos,
                numExamenes: req.body.numExamenes,
                numSesiones: req.body.numSesiones,
                numSesionesDif: req.body.numSesiones,
                numVideosDiferentes: req.body.numVideosDiferentes,
                timeExamenes: req.body.timeExamenes,
                timeVideos:req.body.timeVideos,
                timeVideos:req.body.timeVideos,
                /* numRespuestas: req.body.numRespuestas,            
                timeContenido: req.body.timeContenido,
                timeForos:req.body.timeForos,
                timeSesiones:req.body.timeSesiones,
                timeTotal: req.body.timeTotal */
            });
           
        await indicator.save();
        res.json('saved');
        return 'indicator saved sussesfuly';
    }
    else{
        indicator = new Indicator(
            {   
                student:req.body.student,
                course:req.body.course,
                numVideos:req.body.numVideos,
                numContenido: req.body.numContenido,
                numForos:req.body.numForos,
                numExamenes: req.body.numExamenes,
                numSesiones: req.body.numSesiones,
                numSesionesDif: req.body.numSesiones,
                numVideosDiferentes: req.body.numVideosDiferentes,
                timeExamenes: req.body.timeExamenes,
                timeVideos:req.body.timeVideos,
                timeVideos:req.body.timeVideos,

                
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
