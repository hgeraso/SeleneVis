const Seguimiento = require('../models/seguimiento');

const seguimientoCtrl={}; //he definido un objeto para luego aplicar metodos.
seguimientoCtrl.getDocs = async(req,res)=>{
    
    const docSeguimientoConsulta= await Seguimiento.find();
    res.json(docSeguimientoConsulta);
};
seguimientoCtrl.getStudentsCourse = async(req,res)=>{
    const students= await Seguimiento.aggregate([
        { $group: { _id  : "$course", usernames : {$addToSet: "$username"}  } }
    ])
        res.json(students); 
}

seguimientoCtrl.getStudents = async(req,res)=>{
    const students= await Seguimiento.distinct( "username")
        res.json(students); 
}
seguimientoCtrl.getCourses = async(req,res)=>{
    const courses= await Seguimiento.distinct( "course"); 
        return courses; //Este return es muy importante puesto que se convierte en lo que retorna y hace posible que se use desde 
                         //otra parte de la aplicacion. el res.send() renderiza en el browser la informacion pero a la larga no esta retornando nada en l
                            //la funcion.
        
}


module.exports=seguimientoCtrl;
