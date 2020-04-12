const seguimiento=require('../models/seguimiento')
const statisticCtrl={}; //he definido un objeto para luego aplicar metodos.

statisticCtrl.getStatistics = async(req,res)=>{
    //numero de videos en ese curso y eses estudiante
    const numVideos= await seguimiento.find({ $and : [
        {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},
        {$or:[{name:"play_video"},{name:"pause_video"},{name:"stop_video"}]}
     ]}).count();
    const numContenido= await seguimiento.find( { $and : [
        { $or : [ { name : "nav_content" }, { name : "nav_content_click" },{ name : "nav_content_prev" },{ name : "nav_content_next" },{ name : "nav_content_tab" }] },
        {  "username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
    ]}).count();
         
    const numForos=await seguimiento.find( { $and : [
        { $or : [ { name : "edx.forum.comment.created" }, { name : "edx.forum.response.created" },{ name : "edx.forum.thread.created" }] },
        {  "username":/*"Gustavo_Ramirez_Staff"*/"Helberth_Medina_Sandoval","course":"Unicauca+LeanStartUp+2019-II"}
    ]}).count();

    const numExamenes= await seguimiento.find( { $and : [
        { $or : [ { name : "problem_check" },/*  { name : "problem_graded" } */] },
        {  "username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
    ]}).count();
    
    const numSesiones = await seguimiento.find(
        {  "username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II","name" : "Signin"}
    ).count();

    const numVideosDiferentes= await seguimiento.aggregate([

        {$match:
            
             { $and :[
                {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},
                {$or:[{name:"play_video"},{name:"pause_video"},{name:"stop_video"}]}
             ]}    
        } ,
        { $group :
             { _id : "$answers" 
             } 
        },
        { $count :"numVideosDifferents"
        }
    ]
    );
    const numSesionesDiferentes=await seguimiento.aggregate([

        {$match:
            
             { $and :[
                {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
               
             ]}    
        } ,
        { $group :
             { _id : "$session" 
             } 
        },
        { $count :"numsesionesDifferents" }
    ]
    );
    const timeVideo= await statisticCtrl.getTimeVideo();
    const timeExam= await statisticCtrl.getTimeExam();
    const timeOthers= await statisticCtrl.getTimeOthers();
 res.json(
        {"numVideos":numVideos,
         "numContenido":numContenido,
         "numForos":numForos,
         "numExamenes":numExamenes,
         "numSesiones":numSesiones,
         "numVideosDiferentes":numVideosDiferentes[0].numVideosDifferents,
         "numSesionesDiferentes":numSesionesDiferentes[0].numsesionesDifferents,
         "TimeVideo": timeVideo,
         "TimeExam":timeExam,
         "TimeOthers": timeOthers
        }
    ); 
    
}
    statisticCtrl.getTimeVideo = async function(){

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
         //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
         //res.json(bdTimeVideo);
         return sumTime;
    }
    
    statisticCtrl.getTimeExam= async(req,res)=>{

       
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
         //res.json({ "time Exam":sumTime});
         return sumTime;
    }
    
    statisticCtrl.getTimeOthers = async(req,res)=>{

     
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
         //res.json({"el valor de time others es: ":sumTime});
         //res.json(bdTimeOthers);
         return sumTime;
    
         
     }
    
    


    




module.exports=statisticCtrl;