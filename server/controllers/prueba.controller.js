const seguimiento= require('../models/seguimiento');
const stude=require('../models/studentt');
const pruebaCtrl={}; //he definido un objeto para luego aplicar metodos.
require('../models/studentt');

pruebaCtrl.getTime = async(req,res)=>{
   const regis=await seguimiento.find({ $and : [
        {"username":"Gustavo_Ramirez_Staff","course":"Unicauca+Intro_IoT+2019-II"}
     ]},{name:1,time:1});

     regis.forEach(element => {
         console.log("el valores es:",typeof( element.toObject().time)); //este toObject()es importante porque convierte el Doc.Mongo en Objeto que se puede parsear.
         
     });
     res.json("cargado");
}
module.exports=pruebaCtrl;
