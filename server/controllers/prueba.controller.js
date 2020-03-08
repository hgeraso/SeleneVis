const seguimiento= require('../models/seguimiento');
const stude=require('../models/studentt');
const pruebaCtrl={}; //he definido un objeto para luego aplicar metodos.
require('../models/studentt');

pruebaCtrl.getTime = async(req,res)=>{
   const regis=await seguimiento.findOne({ $and : [
    {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
     ]},{name:1,time:1,date:1});
    objTime =regis.toObject();
    console.log('mirando fecha:',objTime.date);
    console.log(objTime.date.substr(0,4));
    console.log(objTime.date.substr(5,2));
    console.log(objTime.date.substr(8,2));
    console.log("mirando tiempo",objTime.time);
    console.log(objTime.time.substr(0,2));
    console.log(objTime.time.substr(3,2));
    console.log(objTime.time.substr(6,2));






    const time1 =new Date(objTime.date.substr(0,4),objTime.date.substr(5,2),objTime.date.substr(8,2),objTime.time.substr(0,2),objTime.time.substr(3,2),objTime.time.substr(6,2));
    console.log(time1);
    const banderaDate =new Date(1900,00,01);
    console.log(banderaDate);   
    //restime=banderaDate-time1;
    /* console.log("la respuesta es :",new Date(restime));
    console.log("la respuesta es :",new Date(restime));
     */
    console.log("viendo hora actual:",)
     
     //bdTimeVideo= regis.toObject();

    /*  regis.forEach(element => {
         console.log("el valores es:",typeof( element.toObject().time)); //este toObject() es importante porque convierte el Doc.Mongo en Objeto que se puede parsear.
         console.log("el valores es:",( element.toObject().time)); //este toObject() es importante porque convierte el Doc.Mongo en Objeto que se puede parsear.

     }); */
     res.json("cargado");
}

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
                        if (resTime<22){ ///revisa si el signin no tuvo un lapso mayor a 4 horas
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
                                    if (resTime<43){ ///revisa si el signin no tuvo un lapso mayor a 4 horas
                                        sumTime=sumTime+resTime;
                                    }
                                    else{console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ cerro la sesion e ingreso de nuevo al dia siguiente @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                                    };
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

    
    
   /*  const banderaDate=new Date(Date.UTC( (1900,00,01,00,00,00,00))); 
    console.log("banderaDate:",banderaDate)
    var sumTime=new Date(Date.UTC( 1970,00,01,00,00,00,00));
    //var sumTime = new Date(1995,11,17,0,0,0);
    console.log(sumTime);
    var timeEnd=banderaDate; */
   
     //console.log(bdTimeVideo);
    /* bdTimeVideo=[{name:"play_video", time:3},{name:"play_video", time:5},{name:"nav_content", time:7},{name:"play_video", time:8},{name:"play_video", time:9}
    ]; */
  /*    bdTimeVideo.forEach(element => {
        const objelement=element.toObject();
         if(objelement.name=="play_video"||objelement.name=="pause_video"||objelement.name=="stop_video"){
            console.log("ingreso a la condicion de timevideo");
            if(timeEnd==banderaDate){
                console.log("no cumplio la primera condicion inicial");
                 timeEnd=new Date(Date.UTC(objelement.date.substr(0,4),objelement.date.substr(5,2),objelement.date.substr(8,2),objelement.time.substr(0,2),objelement.time.substr(3,2),objelement.time.substr(6,2)));
                console.log("############## timeEnd:",timeEnd);
             }else{
                 console.log("ingreso a la condicion de sumTime");
                 const timeInit= new Date( Date.UTC(objelement.date.substr(0,4),objelement.date.substr(5,2),objelement.date.substr(8,2),objelement.time.substr(0,2),objelement.time.substr(3,2),objelement.time.substr(6,2)));
                 console.log("!!!!!!!!!!!!! TimeInit:",timeInit);
                 console.log("!!!!!!!!!!!!! TimeEnd:",timeEnd);
                 var resTime = timeInit-timeEnd;
                 console.log("&&&&&&&&7 ResTime:",new Date(resTime));
                 console.log("valor suntime:",sumTime);
                 var resTimeReady=new Date(resTime);
                 console.log("restime listo para sumar:",resTimeReady);
                 sumTime= new Date(sumTime);
                 timeEnd=timeInit;
                 console.log("la suma parcial es",sumTime);
             }
         }else{
             console.log("ingreso a la condicion de navconntent");
             if(timeEnd!==banderaDate){
                timeInit= new Date(objelement.date.substr(0,4),objelement.date.substr(5,2),objelement.date.substr(8,2),objelement.time.substr(0,2),objelement.time.substr(3,2),objelement.time.substr(6,2));
                resTime= timeInit-timeEnd;
                 sumTime=sumTime+resTime;
                 timeEnd=banderaDate;
                 console.log("la suma con nav es:",sumTime);
             }
         }
         
     }); */
     res.json(bdTimeVideo);
}


module.exports=pruebaCtrl;
