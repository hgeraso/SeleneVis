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
    const banderaDate =new Date(1900,00,01); 
    sumTime=new Date(1902,00,01);
    timeEnd=banderaDate;
    const bdTimeVideo= await seguimiento.find({ $and : [
        {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},  
     ]}); 
    /* bdTimeVideo=[{name:"play_video", time:3},{name:"play_video", time:5},{name:"nav_content", time:7},{name:"play_video", time:8},{name:"play_video", time:9}
    ]; */
     bdTimeVideo.forEach(element => {
        const objelement=element.toObject();
         if(objelement.name=="play_video"||objelement.name=="pause_video"||objelement.name=="stop_video"){
            console.log("ingreso a la condicion de timevideo");
            if(timeEnd==banderaDate){
                console.log("no cumplio la primera condicion inicial");
                 timeEnd=new Date(objelement.date.substr(0,4),objelement.date.substr(5,2),objelement.date.substr(8,2),objelement.time.substr(0,2),objelement.time.substr(3,2),objelement.time.substr(6,2));

             }else{
                 console.log("ingreso a la condicion de sumTime");
                 timeInit= new Date(objelement.date.substr(0,4),objelement.date.substr(5,2),objelement.date.substr(8,2),objelement.time.substr(0,2),objelement.time.substr(3,2),objelement.time.substr(6,2));
                 resTime= timeInit-timeEnd;
                 sumTime=sumTime + resTime;
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
         
     });
     res.json({time:sumTime});
}


module.exports=pruebaCtrl;
