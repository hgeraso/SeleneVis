const Seguimiento = require('../models/seguimiento');

const seguimientoCtrl={}; //he definido un objeto para luego aplicar metodos.
seguimientoCtrl.getDocs = async(req,res)=>{
    
    const docSeguimientoConsulta= await Seguimiento.find();
    res.json(docSeguimientoConsulta);
};
seguimientoCtrl.getStudents = async(req,res)=>{
    const students= await Seguimiento.aggregate([
        { $group: { _id  : "$course", usernames : {$addToSet: "$username"}  } }
    ])
        res.json(students); 
}

module.exports=seguimientoCtrl;
