const seguimiento = require('../models/seguimiento')
const stadisticsBycontrol = {};


stadisticsBycontrol.getStadisticsDay = async (req, res) => {
    const course = req.body ? req.body.course : req.course;
    const student = req.body ? req.body.student : req.student;

    const days = await seguimiento.find({ "username": student, "course": course }).distinct('date');
    let dataByDays = [];
    let countDays = 0;

    if (days.length) {

        for (let day of days) {

            getBasicStadisticByDay(course, student, day).then(data => {
                dataByDays.push({ control:day, data })
                countDays++;

                if (countDays === (days.length)) {
                    res.json(dataByDays)
                }
            })
        }

    } else {
        res.json({})
    }

}

stadisticsBycontrol.getStadisticSession = async (req, res) => {
    const course = req.body ? req.body.course : req.course;
    const student = req.body ? req.body.student : req.student;

    const sessions = await seguimiento.find({ "course": course, "username": student }).distinct('session');

    let dataBySession = [];
    let countSession = 0;

    if (sessions.length) {

        for (let session of sessions) {

            getBasicStadisticSession(course, student, session).then(data => {
                dataBySession.push({ control:session, data })
                countSession++;

                if (countSession === (sessions.length)) {
                    res.json(dataBySession)
                }
            })
        }

    } else {
        res.json({})
    }

}

//  ===== By Day =====
function getBasicStadisticByDay(course, student, day) {

    return new Promise(async (resolve, reject) => {

        const Videos = await seguimiento.find(
            {
                $and: [
                    { "username": student, "course": course, "date": day },
                    { $or: [{ name: "play_video" }, { name: "pause_video" }, { name: "stop_video" }] }
                ]
            }).countDocuments()


        const Contenido = await seguimiento.find({
            $and: [
                { $or: [{ name: "nav_content" }, { name: "nav_content_click" }, { name: "nav_content_prev" }, { name: "nav_content_next" }, { name: "nav_content_tab" }] },
                { "username": student, "course": course, "date": day }
            ]
        }).countDocuments();

        const Foros = await seguimiento.find({
            $and: [
                { $or: [{ name: "edx.forum.comment.created" }, { name: "edx.forum.response.created" }, { name: "edx.forum.thread.created" }] },
                { "username": student, "course": course, "date": day }
            ]
        }).countDocuments();

        const Examenes = await seguimiento.find({
            $and: [
                { $or: [{ name: "problem_check" }, { name: "problem_graded" }] },
                { "username": student, "course": course, "date": day }
            ]
        }).countDocuments();

        const Home = await seguimiento.find({
            $and: [
                { $or: [{ name: "Signin" }] },
                { "username": student, "course": course, "date": day }
            ]
        }).countDocuments();

        resolve({ Home, Videos, Contenido, Foros, Examenes })
    })
}

// ===== By Session =====
function getBasicStadisticSession(course, student, session) {

    return new Promise(async (resolve, reject) => {

        const Videos = await seguimiento.find(
            {
                $and: [
                    { "username": student, "course": course, "session": session },
                    { $or: [{ name: "play_video" }, { name: "pause_video" }, { name: "stop_video" }] }
                ]
            }).countDocuments()


        const Contenido = await seguimiento.find({
            $and: [
                { $or: [{ name: "nav_content" }, { name: "nav_content_click" }, { name: "nav_content_prev" }, { name: "nav_content_next" }, { name: "nav_content_tab" }] },
                { "username": student, "course": course, "session": session }
            ]
        }).countDocuments();

        const Foros = await seguimiento.find({
            $and: [
                { $or: [{ name: "edx.forum.comment.created" }, { name: "edx.forum.response.created" }, { name: "edx.forum.thread.created" }] },
                { "username": student, "course": course, "session": session }
            ]
        }).countDocuments();

        const Examenes = await seguimiento.find({
            $and: [
                { $or: [{ name: "problem_check" }, { name: "problem_graded" }] },
                { "username": student, "course": course, "session": session }
            ]
        }).countDocuments();

        const Home = await seguimiento.find({
            $and: [
                { $or: [{ name: "Signin" }] },
                { "username": student, "course": course, "session": session }
            ]
        }).countDocuments();

        resolve({ Home, Videos, Contenido, Foros, Examenes })
    })

}


module.exports = stadisticsBycontrol;