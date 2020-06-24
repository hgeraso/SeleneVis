const seguimiento = require('../models/seguimiento');
pruebaCtrl={};
pruebaCtrl.getTime2 = async(req,res)=>{
    

    const bd = await seguimiento.find({"name":"problem_check"});
    const bdTimeOthers= await seguimiento.find({ $and : [
     {"username":"Cristian_Astaiza_Bolanos","course":"Unicauca+C_Enfermeria+2019-II"},  
     ]}).sort("date").sort("time");
     sumTime=0; // en segundos 
     for (let i = 0; i < bdTimeOthers.length-1; i++) {
         //console.log(i+1);
         console.log("entro al ciclo ",i);
         if([[bdTimeOthers[i+1].toObject().date.substr(5,2)*30*24*60*60 + bdTimeOthers[i+1].toObject().date.substr(8,2)*24*60*60 ]
         -[bdTimeOthers[i].toObject().date.substr(5,2)*30*24*60*60 + bdTimeOthers[i].toObject().date.substr(8,2)*24*60*60]] <= (3600*24) ){
                if(bdTimeOthers[i+1].toObject().name=="Signin"){
                    console.log("el siguiente evento es  signin");
                    console.log("aplica el tiempo de otros");
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    sumTime=sumTime + resTime;
                    console.log("sumTime sumado por signin tiene el valor parcial de  ", sumTime);
                }
                else if(bdTimeOthers[i].toObject().name=="pause_video"){
                    console.log("ingreso por pause video")
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    sumTime=sumTime + resTime; 
                    console.log("el sumTime sumado por pause video tiene el valor parcial de ", sumTime)

                }
               else if(bdTimeOthers[i].toObject().name=="play_video"){
                    console.log("ingreso al play video")
                    segTimeInit= (bdTimeOthers[i].toObject().time.substr(0,2)*3600)+bdTimeOthers[i].toObject().time.substr(3,2)*60 + (bdTimeOthers[i].toObject().time.substr(6,2)*1);     
                    segTimeEnd= (bdTimeOthers[i+1].toObject().time.substr(0,2)*3600)+bdTimeOthers[i+1].toObject().time.substr(3,2)*60 + (bdTimeOthers[i+1].toObject().time.substr(6,2)*1);
                    resTime=segTimeEnd-segTimeInit;
                    console.log("el residuo es:",resTime);
                    if (resTime > 60*7){
                        sumTime=sumTime + resTime;
                        console.log("el sumTime sumado por play video mayor a 7 min tiene el valor parcial de ",sumTime)

                    }
                } 
         }                 
    } 
     //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
     //res.json({"el valor de time others es: ":sumTime});
     res.json(bdTimeOthers);

     
 }
 pruebaCtrl.getValidation = async()=>{
    const bdTimeExam = await seguimiento.find({
        $and: [
          //  { "username": student, "course": course },
             { "username": "Karold_Ordonez_Ceron", "course": "Unicauca+LeanStartUp+2019-II" },// este estaba con un susario diferente, quiza era para probar
        ]
    }).sort("date").sort("time");
    sumTime = 0; // en segundos 
    // console.log("entro al Time exam");
    for (let i = 0; i < bdTimeExam.length - 1; i++) {
    //console.log(i+1);
    // console.log("entro al ciclo ", i);

    try {
        const obj = bdTimeExam[i].toObject();
        const objNext = bdTimeExam[i + 1].toObject()
        // console.log(obj.date, objNext.date)
        // console.log(obj.name, objNext.name)
        // console.log(obj.time, objNext.time)


        if (obj.date == objNext.date) {

            if (obj.name == "problem_check" && i > 0) {

                segTimeEnd = (obj.time.substr(0, 2) * 3600) + obj.time.substr(3, 2) * 60 + (obj.time.substr(6, 2) * 1);
                segTimeInit = (bdTimeExam[i - 1].toObject().time.substr(0, 2) * 3600) + bdTimeExam[i - 1].toObject().time.substr(3, 2) * 60 + (bdTimeExam[i - 1].toObject().time.substr(6, 2) * 1);
                resTime = segTimeEnd - segTimeInit;
                // console.log("el residuo es:", resTime);


                if (bdTimeExam[i - 1].toObject().name == "Signin") {
                    // console.log("se descarta por Signin");

                } else {
                    sumTime = sumTime + resTime;
                    // console.log("la suma parcial de Time exam es:", sumTime);
                }

            }
        }
    } catch (error) {
        console.log("error en el registro", bdTimeExam[i], bdTimeExam[i + 1])
        console.log(i, i + 1)
    }

    }
    // console.log("es de tipo :", typeof (bdTimeExam.length), bdTimeExam.length);
    // console.log("la suma total de TimeExam es:", sumTime);
    //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
    //res.json({ "time Exam":sumTime});
    return sumTime;
 }
module.exports=pruebaCtrl;

