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
    ]}).count()

    const numExamenes= await seguimiento.find( { $and : [
        { $or : [ { name : "problem_check" }, { name : "problem_graded" }] },
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
    console.log(timeVideo);
   /*  .then(v=>{console.log("el valor de tiempo de video es",v); return v;}).catch(error=>{console.log('el errorrr es:',error)});
    console.log("el valor de tiempo de video es",timeVideo); */

    res.json(
        {"numVideos":numVideos,
         "numContenido":numContenido,
         "numForos":numForos,
         "numExamenes":numExamenes,
         "numSesiones":numSesiones,
         "numVideosDiferentes":numVideosDiferentes[0].numVideosDifferents,
         "numSesionesDiferentes":numSesionesDiferentes[0].numsesionesDifferents,
         "TimeVideo": timeVideo
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
    
    
    


    




module.exports=statisticCtrl;