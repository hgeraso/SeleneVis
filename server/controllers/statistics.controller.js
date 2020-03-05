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



    res.json(
        {"numVideos":numVideos,
         "numContenido":numContenido,
         "numForos":numForos,
         "numExamenes":numExamenes,
         "numSesiones":numSesiones,
         "numVideosDiferentes":numVideosDiferentes[0].numVideosDifferents
        }
    );
    
};



module.exports=statisticCtrl;