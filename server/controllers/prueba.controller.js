const seguimiento = require('../models/seguimiento');
pruebaCtrl={};
pruebaCtrl.getTime2 = async(req,res)=>{

     
    const bdTimeOthers= await seguimiento.find({ $and : [
     {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},  
     ]}).sort("date").sort("time");
     sumTime=0; // en segundos 

    

     for (let i = 0; i < bdTimeOthers.length-1; i++) {
         //console.log(i+1);
         console.log("entro al ciclo ",i);
         if([[bdTimeOthers[i+1].toObject().date.substr(5,2)*30*24*60*60 + bdTimeOthers[i+1].toObject().date.substr(8,2)*24*60*60 ]
         -[bdTimeOthers[i].toObject().date.substr(5,2)*30*24*60*60 + bdTimeOthers[i].toObject().date.substr(8,2)*24*60*60]] <= (3600*24) ){
                if(bdTimeOthers[i+1].toObject().name=="Signin"){
                    console.log("el siguiente evento es  signin");
                    console.log("aplica el tiempo de otros");
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    sumTime=sumTime + resTime;
                    console.log("sumTime sumado por signin tiene el valor parcial de  ", sumTime);
                }
                else if(bdTimeOthers[i].toObject().name=="pause_video"){
                    console.log("ingreso por pause video")
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    sumTime=sumTime + resTime; 
                    console.log("el sumTime sumado por pause video tiene el valor parcial de ", sumTime)

                }
               else if(bdTimeOthers[i].toObject().name=="play_video"){
                    console.log("ingreso al play video")
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    if (resTime > 60*7){
                        sumTime=sumTime + resTime;
                        console.log("el sumTime sumado por play video mayor a 7 min tiene el valor parcial de ",sumTime)

                    }
                } 
         }                 
    } 
     //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
     //res.json({"el valor de time others es: ":sumTime});
     res.json(bdTimeOthers);

     
 }
module.exports=pruebaCtrl;

