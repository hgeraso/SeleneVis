const seguimiento = require('../models/seguimiento');
pruebaCtrl={};
pruebaCtrl.getTime2 = async(req,res)=>{

    const bdTimeVideo= await seguimiento.find({ $and : [
     {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},  
     ]}).sort("time").sort("date");
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
     res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
     //res.json(bdTimeVideo);
}




module.exports=pruebaCtrl;
