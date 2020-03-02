const Docente = require('../models/docente');

const docenteCtrl={}; //he definido un objeto para luego aplicar metodos.
docenteCtrl.getDocentes = async(req,res)=>{
    //res.send('HELLO HERMAN');
    /*res.json({
        status: 'docentes here'
    });*/
    const docentes = await Docente.find();
    res.json(docentes);
    


};

docenteCtrl.createDocente=  async(req,res)=>{
    console.log(req.body);
    //res.json('received');
    
        
    
    const docent = new Docente(
    {
        name:req.body.name,
        course:req.body.course,
        cedula:req.body.cedula,
        password:req.body.password,
        credencial: req.body.credencial
    });

    docent.save();
    res.json({'status':'Docente guardado'});



     
}

docenteCtrl.getDocente = async (req,res)=>{ 
    console.log(req.params.id)
    const docent = await Docente.findById(req.params.id);
    res.json(docent);
}
docenteCtrl.editDocente= async(req,res)=>{
    const {id}=req.params;
    const docent={
        name: req.body.name,
        curso: req.body.curso,
        cedula: req.body.cedula,
        password: req.body.password,
        credencial:req.body.credencial
    }
    await Docente.findByIdAndUpdate(id,{$set:docent},{new:true});
    res.json({
        "status":'docente update'
    });
}

docenteCtrl.deleteDocente= async(req,res)=>{
    await Docente.findByIdAndRemove(req.params.id);
    res.json({
        status:'empleado Deleted'
    });
};



module.exports=docenteCtrl;
