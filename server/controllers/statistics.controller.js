const seguimiento=require('../models/seguimiento')
const statisticCtrl={}; //he definido un objeto para luego aplicar metodos.

statisticCtrl.getNumVideos = async(req,res)=>{
    //numero de videos en ese curso y eses estudiante
    const numVideos= await seguimiento.find({ $and : [
        {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"},
        {$or:[{name:"play_video"},{name:"pause_video"},{name:"stop_video"}]}
     ]}).count();
    const numContenido= await seguimiento.find( { $and : [
        { $or : [ { name : "nav_content" }, { name : "nav_content_click" },{ name : "nav_content_prev" },{ name : "nav_content_next" },{ name : "nav_content_tab" }] },
        {  "username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
    ]}).count();


    res.json(
        {"numVideos":numVideos,
         "numContenido":numContenido
        }
    );
    
};



module.exports=statisticCtrl;