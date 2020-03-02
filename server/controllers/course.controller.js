const Course = require('../models/course');

const courseCtrl={}; //he definido un objeto para luego aplicar metodos.
courseCtrl.getCourses = async(req,res)=>{
    
    const cursos= await Course.find();
    res.json(cursos);
};

courseCtrl.createCourse=  async(req,res)=>{
       const course = new Course(
    {
        name:req.body.name,
        students:req.body.students
    });
    course.save();
    res.json({'status':'Course guardado'});
}

courseCtrl.getCourse= async (req,res)=>{ 
    console.log(req.params.id)
    const docent = await Course.findById(req.params.id);
    res.json(docent);
}

courseCtrl.editCourse= async(req,res)=>{
    const {id}=req.params;
    const course={
        name: req.body.name,
        curso: req.body.students,
    }
    await Course.findByIdAndUpdate(id,{$set:course},{new:true});
    res.json({
        "status":'course update'
    });
}

courseCtrl.deleteCourse= async(req,res)=>{
    await Course.findByIdAndRemove(req.params.id);
    res.json({
        status:'Course Deleted'
    });
};


module.exports=courseCtrl;
