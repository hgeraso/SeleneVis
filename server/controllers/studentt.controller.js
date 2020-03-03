const Studentt = require('../models/studentt')

const studenttCtrl={}; //he definido un objeto para luego aplicar metodos.

studenttCtrl.getStudentts = async(req,res)=>{
    
    const students= await Studentt.find();
    res.json(students);
};

studenttCtrl.createStudentt =  async(req,res)=>{
    
    if(req.body){ 
        student = new Studentt(
            {
            name:req.body.name,
            courses:req.body.courses
            });
           
        await student.save();
        res.json('saved');
        return 'student saved sussesfuly';
      
    }
    else{
    const student = new Studentt(
            {
            name:req.name,
            courses:req.courses
            });
    await student.save();
    respuesta='student saved sussesfuly';
    return respuesta;
    
    } 
}

studenttCtrl.getStudentt= async (req,res)=>{ 
    console.log(req.params.id)
    const student = await Course.findById(req.params.id);
    res.json(student);
}

studenttCtrl.editStudentt= async(req,res)=>{
    const {id}=req.params;
    const student={
        name: req.body.name,
        courses: req.body.courses,
    }
    await Studentt.findByIdAndUpdate(id,{$set:student},{new:true});
    res.json({
        "status":'studentt  update'
    });
}

studenttCtrl.deleteStudentt= async(req,res)=>{
    await Course.findByIdAndRemove(req.params.id);
    res.json({
        status:'Studentt Deleted'
    });
};


module.exports=studenttCtrl;
