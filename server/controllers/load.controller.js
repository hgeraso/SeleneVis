const seguimiento = require('../controllers/seguimiento.controller');
const segui = require('../models/seguimiento');
const Course = require('../models/course');
const courseCtrl= require('./course.controller');


const loadCtrl={}
{/*loadCtrl.loadCollections = async  (req,res) => {
    const courses= await segui.distinct( "course");
    const students= await segui.distinct( "username");
    res.send (students)
    console.log('ejecutando funcion')
 }*/
//  loadCtrl.loadCollections= async function(req,res){
//      const obj= seguimiento.getCourses;
//      console.log(obj);
     
//      obj().then(v=>{
//         console.log("este es el resultado:",v);
//         res.send(v);
//     }).catch(e=>{
//         console.log('errorrrrr:',e);
//     });

//  }
//  // ---------------------------Esta es la manera de trabajar a partir de promesas--------------------
//  loadCtrl.loadCollections = async (req,res)=>{
//      seguimiento.getCourses().then(v=>{console.log("este es el valor:",v); res.send(v)});
//  }
//   // --------------------------Fin de la manera de trabajar a partir de promesas--------------------
}
loadCtrl.loadCollections = async  (req,res) => {
    const courses= await segui.distinct( "course");
    const students= await segui.distinct( "username");
   
    const studentsOfCourse=await segui.aggregate([
        { $group: { _id  : "$course", usernames : {$addToSet: "$username"}  } }
    ])
    const coursesOfStudents=await segui.aggregate([
        { $group: { _id  : "$username", courses : {$addToSet: "$course"}  } }
    ])

   // courses.forEach(element => {
        //console.log('el elemento de curso es este',element)
        const obj={
            "name": "adfadfa",
            "students":['']
        };
        console.log(obj);
        console.log(obj.name);
        console.log(obj.students);
        console.log('viendo tipo de funcion:',courseCtrl.createCourse(obj).then(v=>{console.log('new course saved',v)}).catch(error=>{console.log('el errorrr es:',error);}))
   // });



    res.send (coursesOfStudents);
    
}


module.exports=loadCtrl;
