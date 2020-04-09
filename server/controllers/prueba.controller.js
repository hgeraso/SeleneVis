const seguimiento = require('../models/seguimiento');
pruebaCtrl={};
pruebaCtrl.getTime2 = async(req,res)=>{

    const bd = await seguimiento.find( { $and : [
        {"name":"problem_check"},  
        ]} );;  
    const bdTimeVideo= await seguimiento.find({ $and : [
     {"username":"Karold_Ordonez_Ceron","course":"Unicauca+LeanStartUp+2019-II"},  
     ]}).sort("date").sort("time");
     sumTime=0; // en segundos 
     for (let i = 0; i < bdTimeVideo.length-1; i++) {
         //console.log(i+1);
         console.log("entro al ciclo ",i);
         if (bdTimeVideo[i].toObject().date==bdTimeVideo[i+1].toObject().date){
                if(bdTimeVideo[i].toObject().name=="play_video"){
                    console.log("entro al play video");
                    segTimeInit= (bdTimeVideo[i].toObject().time.substr(0,2)*3600)+bdTimeVideo[i].toObject().time.substr(3,2)*60 + (bdTimeVideo[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeVideo[i+1].toObject().time.substr(0,2)*3600)+bdTimeVideo[i+1].toObject().time.substr(3,2)*60 + (bdTimeVideo[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                        
                    if (resTime<60*7){ 
                        if(bdTimeVideo[i+1].toObject().name=="Signin"){
                            console.log("se descarta por Signin");

                        }else{
                            sumTime=sumTime+resTime;
                            console.log("la suma parcial es:",sumTime);
                        }
                    }
                }
        }    
     } 
     console.log("es de tipo :",typeof(bdTimeVideo.length),bdTimeVideo.length);
     //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
     res.json(bdTimeVideo);
}
pruebaCtrl.getTimeExam= async(req,res)=>{

    const bd = await seguimiento.find( { $and : [
        {"name":"problem_check"},  
        ]} );;  
    const bdTimeExam= await seguimiento.find({ $and : [
     {"username":"Karold_Ordonez_Ceron","course":"Unicauca+LeanStartUp+2019-II"},  
     ]}).sort("date").sort("time");
     sumTime=0; // en segundos 
     for (let i = 0; i < bdTimeExam.length-1; i++) {
         //console.log(i+1);
         console.log("entro al ciclo ",i);
         if (bdTimeExam[i].toObject().date==bdTimeExam[i+1].toObject().date){
                if(bdTimeExam[i].toObject().name=="problem_check"){
                    console.log("entro al Time exam");
                    segTimeEnd= (bdTimeExam[i].toObject().time.substr(0,2)*3600)+bdTimeExam[i].toObject().time.substr(3,2)*60 + (bdTimeExam[i].toObject().time.substr(6,2)*1);     
                    segTimeInit= (bdTimeExam[i-1].toObject().time.substr(0,2)*3600)+bdTimeExam[i-1].toObject().time.substr(3,2)*60 + (bdTimeExam[i-1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                        
                    
                        if(bdTimeExam[i-1].toObject().name=="Signin"){
                            console.log("se descarta por Signin");

                        }else{
                            sumTime=sumTime+resTime;
                            console.log("la suma parcial de Time exam es:",sumTime);
                        }
                    
                }
        }    
     } 
     console.log("es de tipo :",typeof(bdTimeExam.length),bdTimeExam.length);
     console.log("la suma total de TimeExam es:",sumTime);
     //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
     res.json({ "time Exam":sumTime});
     return sumTime;
}



module.exports=pruebaCtrl;
