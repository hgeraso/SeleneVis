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


    res.json(
        {"numVideos":numVideos,
         "numContenido":numContenido,
         "numForos":numForos,
         "numExamenes":numExamenes,
         "numSesiones":numSesiones,
         "numVideosDiferentes":numVideosDiferentes[0].numVideosDifferents,
         "numSesionesDiferentes":numSesionesDiferentes[0].numsesionesDifferents
        }
    );
}
    statisticCtrl.getTime = (req,res)=>{
        sumTime=0;
        timeEnd=0;
        /* const bdTimeVideo= await seguimiento.find({ $and : [
            {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},
            
         ]}); */
         bdTimeVideo=[{name:"play_video", time:3},{name:"play_video", time:5},{name:"nav_content", time:7},{name:"play_video", time:8},{name:"play_video", time:9}
        ];
         bdTimeVideo.forEach(element => {
             if(element.name=="play_video"||element.name=="pause_video"||element.name=="stop_video"){
                console.log("ingreso a la condicion de timevideo");
                if(timeEnd==0){
                    console.log("no cumplio la primera condicion inicial");
                     timeEnd=element.time;
                 }else{
                     console.log("ingreso a la condicion de sumTime");
                     timeInit=element.time;
                     resTime= timeInit-timeEnd;
                     sumTime=sumTime+ resTime;
                     timeEnd=timeInit;
                     console.log("la suma parcial es",sumTime);
                 }
             }else{
                 console.log("ingreso a la condicion de navconntent");
                 if(timeEnd!==0){
                     timeInit=element.time;
                     resTime= timeInit-timeEnd;
                     sumTime=sumTime+resTime;
                     timeEnd=0;
                     console.log("la suma con nav es:",sumTime);
                 }
             }
             
         });
         res.json({time:sumTime});
    }

    


    




module.exports=statisticCtrl;