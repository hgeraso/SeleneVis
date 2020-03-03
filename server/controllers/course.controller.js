const Course = require('../models/course');

const courseCtrl={}; //he definido un objeto para luego aplicar metodos.
courseCtrl.getCourses = async(req,res)=>{
    
    const cursos= await Course.find();
    res.json(cursos);
};

courseCtrl.createCourse =  async(req,res)=>{
    
    if(req.body){ 
        console.log('ingreso a la primera condicion');

        course = new Course(
            {
            name:req.body.name,
            students:req.body.students
            });
           
        await course.save();
        res.json('saved');
        return 'course saved sussesfuly';
      
    }else{

    console.log('ingreso a la segunda condicion');
    const course = new Course(
            {
            name:req.name,
            students:req.students
            });
    await course.save();
    respuesta='course saved sussesfuly';
    return respuesta;
    
    } 
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
