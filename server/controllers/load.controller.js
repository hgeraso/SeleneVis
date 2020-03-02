const seguimiento = require('../controllers/seguimiento.controller');
const segui = require('../models/seguimiento');

const loadCtrl={}
/*loadCtrl.loadCollections = async  (req,res) => {
    const courses= await segui.distinct( "course");
    const students= await segui.distinct( "username");
    res.send (students)
    console.log('ejecutando funcion')
 }*/
 loadCtrl.loadCollections= async function(req,res){
     const obj= seguimiento.getCourses;
     console.log(obj);
     
     obj().then(v=>{
        console.log("este es el resultado:",v);
        res.send(v);
    }).catch(e=>{
        console.log('errorrrrr:',e);
    });

 }

module.exports=loadCtrl;
