const seguimiento = require('../models/seguimiento')
const statisticCtrl = {}; //he definido un objeto para luego aplicar metodos.

statisticCtrl.getStatistics = async (req, res) => {

    var course = req.body ? req.body.course : req.course;
    var student = req.body ? req.body.student : req.student;
    // }

    //numero de videos en ese curso y eses estudiante
    const numVideos = await seguimiento.find(
        {
            $and: [
                { "username": student, "course": course },
                { $or: [{ name: "play_video" }, { name: "pause_video" }, { name: "stop_video" }] }
            ]
        }).countDocuments();

    const numContenido = await seguimiento.find({
        $and: [
            { $or: [{ name: "nav_content" }, { name: "nav_content_click" }, { name: "nav_content_prev" }, { name: "nav_content_next" }, { name: "nav_content_tab" }] },
            { "username": student, "course": course }
        ]
    }).countDocuments();

    const numForos = await seguimiento.find({
        $and: [
            { $or: [{ name: "edx.forum.comment.created" }, { name: "edx.forum.response.created" }, { name: "edx.forum.thread.created" }] },
            { "username": student, "course": course }
            // { "username":/*"student*/"Helberth_Medina_Sandoval", "course": "Unicauca+LeanStartUp+2019-II" }
        ]
    }).countDocuments();

    const numExamenes = await seguimiento.find({
        $and: [
            { $or: [{ name: "problem_check" },/*  { name : "problem_graded" } */] },
            { "username": student, "course": course }
        ]
    }).countDocuments();

    const numSesiones = await seguimiento.find(
        { "username": student, "course": course, "name": "Signin" }
    ).countDocuments();

    const numVideosDiferentes = await seguimiento.aggregate([
        {
            $match: {
                $and: [
                    { "username": student, "course": course },
                    { $or: [{ name: "play_video" }, { name: "pause_video" }, { name: "stop_video" }] }
                ]
            }
        },
        {
            $group: { _id: "$answers" }
        },
        { $count: "numVideosDifferents" }
    ]);

    const numSesionesDiferentes = await seguimiento.aggregate([

        {
            $match:

            {
                $and: [{ "username": student, "course": course }]
            }
        },
        {
            $group:
            {
                _id: "$session"
            }
        },
        { $count: "numsesionesDifferents" }
    ]);

    const timeVideo = await statisticCtrl.getTimeVideo(course, student);
    const timeExam = await statisticCtrl.getTimeExam(course, student);
    const timeOthers = await statisticCtrl.getTimeOthers(course, student);


    const staticsToSave = {
        idCourseStudent: student + course,
        numVideos,
        numContenido,
        numForos,
        numExamenes,
        numSesiones,
        numVideosDiferentes: numVideosDiferentes.length > 0 ? numVideosDiferentes[0].numVideosDifferents : 0,
        numSesionesDiferentes: numSesionesDiferentes[0].numsesionesDifferents,
        TimeVideos: timeVideo,
        TimeExam: timeExam,
        TimeOthers: timeOthers,
        course,
        student,
    }

    return staticsToSave;

}

statisticCtrl.getTimeVideo = async function (course, student) {

    const bdTimeVideo = await seguimiento.find({
        $and: [
            { "username": student, "course": course },
        ]
    }).sort("time").sort("date");
    sumTime = 0; // en segundos 

    for (let i = 0; i < bdTimeVideo.length - 1; i++) {
        //console.log(i+1);

        // console.log("entro al ciclo ", i);
        try {
            if (bdTimeVideo[i].toObject().date == bdTimeVideo[i + 1].toObject().date) {
                if (bdTimeVideo[i].toObject().name == "play_video") {
                    // console.log("entro al play video");
                    segTimeInit = (bdTimeVideo[i].toObject().time.substr(0, 2) * 3600) + bdTimeVideo[i].toObject().time.substr(3, 2) * 60 + (bdTimeVideo[i].toObject().time.substr(6, 2) * 1);
                    segTimeEnd = (bdTimeVideo[i + 1].toObject().time.substr(0, 2) * 3600) + bdTimeVideo[i + 1].toObject().time.substr(3, 2) * 60 + (bdTimeVideo[i + 1].toObject().time.substr(6, 2) * 1);
                    resTime = segTimeEnd - segTimeInit;
                    // console.log("el residuo es:", resTime);

                    if (resTime < 60 * 7) {
                        if (bdTimeVideo[i + 1].toObject().name == "Signin") {
                            // console.log("se descarta por Signin");

                        } else {
                            sumTime = sumTime + resTime;
                            // console.log("la suma parcial es:", sumTime);
                        }
                    }
                }
            }

        } catch (error) {

            console.log("error en el registro", bdTimeVideo[i])
        }
    }
    // console.log("es de tipo :", typeof (bdTimeVideo.length), bdTimeVideo.length);
    //res.json({"la suma total es": sumTime}); //tiempo en segundo de interaccion directa con el video
    //res.json(bdTimeVideo);
    return sumTime;
}

statisticCtrl.getTimeExam = async (course, student) => {

    const bdTimeExam = await seguimiento.find({
        $and: [
            { "username": student, "course": course },
            // { "username": "Karold_Ordonez_Ceron", "course": "Unicauca+LeanStartUp+2019-II" }, este estaba con un susario diferente, quiza era para probar
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

statisticCtrl.getTimeOthers = async (course, student) => {


    const bdTimeOthers = await seguimiento.find({
        $and: [
            { "username": student, "course": course },
        ]
    }).sort("date").sort("time");
    sumTime = 0; // en segundos 
    for (let i = 0; i < bdTimeOthers.length - 1; i++) {
        //console.log(i+1);
        // console.log("entro al ciclo ", i);
        if ([[bdTimeOthers[i + 1].toObject().date.substr(5, 2) * 30 * 24 * 60 * 60 + bdTimeOthers[i + 1].toObject().date.substr(8, 2) * 24 * 60 * 60]
            - [bdTimeOthers[i].toObject().date.substr(5, 2) * 30 * 24 * 60 * 60 + bdTimeOthers[i].toObject().date.substr(8, 2) * 24 * 60 * 60]] <= (3600 * 24)) {
            if (bdTimeOthers[i + 1].toObject().name == "Signin") {
                // console.log("el siguiente evento es  signin");
                // console.log("aplica el tiempo de otros");
                segTimeInit = (bdTimeOthers[i].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i].toObject().time.substr(6, 2) * 1);
                segTimeEnd = (bdTimeOthers[i + 1].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i + 1].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i + 1].toObject().time.substr(6, 2) * 1);
                resTime = segTimeEnd - segTimeInit;
                // console.log("el residuo es:", resTime);
                sumTime = sumTime + resTime;
                // console.log("sumTime sumado por signin tiene el valor parcial de  ", sumTime);
            }
            else if (bdTimeOthers[i].toObject().name == "pause_video") {
                // console.log("ingreso por pause video")
                segTimeInit = (bdTimeOthers[i].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i].toObject().time.substr(6, 2) * 1);
                segTimeEnd = (bdTimeOthers[i + 1].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i + 1].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i + 1].toObject().time.substr(6, 2) * 1);
                resTime = segTimeEnd - segTimeInit;
                // console.log("el residuo es:", resTime);
                sumTime = sumTime + resTime;
                // console.log("el sumTime sumado por pause video tiene el valor parcial de ", sumTime)

            }
            else if (bdTimeOthers[i].toObject().name == "play_video") {
                // console.log("ingreso al play video")
                segTimeInit = (bdTimeOthers[i].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i].toObject().time.substr(6, 2) * 1);
                segTimeEnd = (bdTimeOthers[i + 1].toObject().time.substr(0, 2) * 3600) + bdTimeOthers[i + 1].toObject().time.substr(3, 2) * 60 + (bdTimeOthers[i + 1].toObject().time.substr(6, 2) * 1);
                resTime = segTimeEnd - segTimeInit;
                // console.log("el residuo es:", resTime);
                if (resTime > 60 * 7) {
                    sumTime = sumTime + resTime;
                    // console.log("el sumTime sumado por play video mayor a 7 min tiene el valor parcial de ", sumTime)

                }
            }
        }
    }
    //res.json({"el valor de time others es: ":sumTime});
    //res.json(bdTimeOthers);
    return sumTime;

}









module.exports = statisticCtrl;