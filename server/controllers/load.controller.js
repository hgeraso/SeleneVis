const seguimiento = require('../controllers/seguimiento.controller');
const segui = require('../models/seguimiento');
const Course = require('../models/course');
const courseCtrl= require('./course.controller');
const studenttCtrl = require('./studentt.controller');


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
 // ############Inicio Seccion para hacer las consultas avanzadas y guardar el resultado de la promesa en los diferentes arreglos-----
    const courses= await segui.distinct( "course"); //devuelve lista total de cursos unicos
    const students= await segui.distinct( "username");// devuelve lista total de estudiantes unicos
    const studentsOfCourse=await segui.aggregate([      //devulve lista completa de cursos con sus respectivos estudiantes.
        { $group: { _id  : "$course", usernames : {$addToSet: "$username"}  } }
    ])
    const coursesOfStudents=await segui.aggregate([
        { $group: { _id  : "$username", courses : {$addToSet: "$course"}  } }
    ])
// ###########fin Seccion para hacer las consultas avanzadas y guardar el resultado de la promesa en los diferentes arreglos-----

{ // ############Inicio Seccion Para guardar los cursos a la coleccion y asignarles un Id-##############  
   /* courses.forEach(course=> {
        const reqCourse={
            "name" : course,
            "students":[]
        };
        console.log('viendo tipo de funcion guardar curso:',courseCtrl.createCourse(reqCourse).then(v=>{console.log('new course saved',v)}).catch(error=>{console.log('el errorrr es:',error);}))
    });*/
    // ----- Fin Seccion Para guardar todos los  cursos consultados a la coleccion y asignarles un Id-------  

    //#### Inicio seccion para guardar los estudiantes consultados a la coleccion y asignales un Id############
    /*students.forEach(student => {
        const reqStudent= {
              "name":student,
              "courses":[]
        }
        console.log("viendo tipo de funcion guardar estudiante",studenttCtrl.createStudentt(reqStudent).then(v=>{console.log('new student saved:',v)}).catch(error=>{console.log('El error de estudiante es:',v)}));
        
    });*/
} //#### fin seccion para guardar los estudiantes consultados a la coleccion y asignales un Id############

    studentsOfCourse.forEach(register => {
        
            const reqCourse={
                "name" : register._id,
                "students":register.usernames
            };
            console.log('viendo tipo de funcion guardar curso:',courseCtrl.createCourse(reqCourse).then(v=>{console.log('new course saved',v)}).catch(error=>{console.log('el errorrr es:',error);}))
        });
    
        coursesOfStudents.forEach(register => {
        
            const reqStudent={
                "name" : register._id,
                "students":register.courses
            };
            console.log('viendo tipo de funcion guardar estudiante:',studenttCtrl.createStudentt(reqStudent).then(v=>{console.log('new student saved',v)}).catch(error=>{console.log('el errorrr es:',error);}))
        });
    res.json (studentsOfCourse);
    
}


module.exports=loadCtrl;
