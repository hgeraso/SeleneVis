const seguimiento = require('../models/seguimiento');
pruebaCtrl={};
pruebaCtrl.getTime2 = async(req,res)=>{

    const bdTimeVideo= await seguimiento.find({ $and : [
        {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},  
     ]}).sort("time").sort("date");
     sumTime=0; // en segundos
     for (let i = 0; i < bdTimeVideo.length-1; i++) {
         console.log(i+1);
         console.log("entro al ciclo ",i);
         if (bdTimeVideo[i].toObject().date==bdTimeVideo[i+1].toObject().date){
                if(bdTimeVideo[i].toObject().name=="play_video"||bdTimeVideo[i].toObject().name=="nav_content_prev"||bdTimeVideo[i].toObject().name=="stop_video"){
                    console.log("el valor del name es: ",bdTimeVideo[i].toObject().name);
                    if(bdTimeVideo[i+1].toObject().name=="Signin"){
                        segTimeInit= (bdTimeVideo[i].toObject().time.substr(0,2)*3600)+bdTimeVideo[i].toObject().time.substr(3,2)*60 + (bdTimeVideo[i].toObject().time.substr(6,2)*1);     
                        segTimeEnd= (bdTimeVideo[i+1].toObject().time.substr(0,2)*3600)+bdTimeVideo[i+1].toObject().time.substr(3,2)*60 + (bdTimeVideo[i+1].toObject().time.substr(6,2)*1);
                        resTime=segTimeEnd-segTimeInit;
                        if (resTime<14400){ ///revisa si el signin no tuvo un lapso mayor a 4 horas
                            sumTime=sumTime+resTime;
                        }
                        else{console.log("#####################3cerro la sesion e ingreso de nuevo el mismo dia########################################3 ")
                        };

                    }else{
                    console.log("Fecha Init",bdTimeVideo[i].toObject().time);
                    console.log("Fecha End",bdTimeVideo[i+1].toObject().time);
                    console.log("parseotime1",bdTimeVideo[i+1].toObject().time.substr(0,2),bdTimeVideo[i+1].toObject().time.substr(3,2),bdTimeVideo[i+1].toObject().time.substr(6,2))
                    segTimeInit= (bdTimeVideo[i].toObject().time.substr(0,2)*3600)+bdTimeVideo[i].toObject().time.substr(3,2)*60 + (bdTimeVideo[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeVideo[i+1].toObject().time.substr(0,2)*3600)+bdTimeVideo[i+1].toObject().time.substr(3,2)*60 + (bdTimeVideo[i+1].toObject().time.substr(6,2)*1);
                    console.log(segTimeInit);
                    console.log(segTimeEnd);
                    resTime=segTimeEnd-segTimeInit;
                    sumTime=sumTime+resTime;
                    console.log(resTime);
                    console.log("el acumulado parcial es ",sumTime);
                    }
                }
        }else {     
                  
                  //  condition to validate the working between days differents. 
                  if([[bdTimeVideo[i+1].toObject().date.substr(5,2)*30*24*60*60 + bdTimeVideo[i+1].toObject().date.substr(8,2)*24*60*60 ]
                  -[bdTimeVideo[i].toObject().date.substr(5,2)*30*24*60*60 + bdTimeVideo[i].toObject().date.substr(8,2)*24*60*60]] <= (3600*24) ){

                   
                            if(bdTimeVideo[i].toObject().name=="play_video"||bdTimeVideo[i].toObject().name=="pause_video"||bdTimeVideo[i].toObject().name=="stop_video"){
                                if(bdTimeVideo[i+1].toObject().name=="Signin"){
                                    segTimeInit= (bdTimeVideo[i].toObject().time.substr(0,2)*3600)+bdTimeVideo[i].toObject().time.substr(3,2)*60 + (bdTimeVideo[i].toObject().time.substr(6,2)*1);     
                                    segTimeEnd= ([bdTimeVideo[i+1].toObject().time.substr(0,2)+24]*3600)+[bdTimeVideo[i+1].toObject().time.substr(3,2)]*60 + (bdTimeVideo[i+1].toObject().time.substr(6,2)*1);
                                    resTime=segTimeEnd-segTimeInit;
                                    if (resTime<14400){ ///revisa si el signin no tuvo un lapso mayor a 4 horas
                                        sumTime=sumTime+resTime;
                                    }
                                    else{console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ cerro la sesion e ingreso de nuevo al dia siguiente @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                                    }
                                }else{
                                    console.log("Fecha Init",bdTimeVideo[i].toObject().time);
                                    console.log("Fecha End",bdTimeVideo[i+1].toObject().time);
                                    console.log("parseotime1",bdTimeVideo[i+1].toObject().time.substr(0,2),bdTimeVideo[i+1].toObject().time.substr(3,2),bdTimeVideo[i+1].toObject().time.substr(6,2))
                                    segTimeInit= (bdTimeVideo[i].toObject().time.substr(0,2)*3600)+bdTimeVideo[i].toObject().time.substr(3,2)*60 + (bdTimeVideo[i].toObject().time.substr(6,2)*1);     
                                    segTimeEnd= ([bdTimeVideo[i+1].toObject().time.substr(0,2)+24]*3600)+[bdTimeVideo[i+1].toObject().time.substr(3,2)]*60 + (bdTimeVideo[i+1].toObject().time.substr(6,2)*1);
                                    console.log(segTimeInit);
                                    console.log(segTimeEnd);
                                    resTime=segTimeEnd-segTimeInit;
                                    sumTime=sumTime+resTime;
                                    console.log(resTime);
                                    console.log("el acumulado parcial es ",sumTime);
                                    console.log("es probable que haya salido e ingresado por favoritos a la misma parte del modulo")
                                }
                            }
                }else{
                    console.log(" cerro la sesion por mas de un dia");
                }
        }             
      } 
     console.log("es de tipo :",typeof(bdTimeVideo.length),bdTimeVideo.length);
     res.json(bdTimeVideo);
}


module.exports=pruebaCtrl;
