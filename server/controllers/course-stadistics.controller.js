const seguimiento = require('../models/seguimiento')
const stadisticsByCourse = {};

stadisticsByCourse.getStadisticsByCourse = async (req, res) => {
    const course = req.body.course;
    const date = '2020-02-06';
    buildStadisticsOfCourse(course).then(data => res.json(data))

}

// === diferents Days With Activities ===
function getDaysWithActivities(course) {

    return new Promise((resolve, reject) => {
        seguimiento.find({ "course": course }).distinct('date')
            .exec((err, days) => {
                if (err) reject("Error on consult")
                else resolve(days)
            })
    })
}

// ==== number videos by day =====
function numVideosByCourseDate(course, date) {

    return new Promise((resolve, reject) => {
        seguimiento.find({
            $and: [
                { "course": course, 'date': date },
                { $or: [{ name: "play_video" }, { name: "pause_video" }, { name: "stop_video" }] }
            ]
        }).countDocuments()
            .exec((err, numvideos) => {
                if (err) reject("error on consult", err)
                else resolve({ x: date, y: numvideos, group: 'Videos' })
            })
    })

}

// === number foros by day =====
function numForosByCourseDate(course, date) {

    return new Promise((resolve, reject) => {
        seguimiento.find({
            $and: [
                { "course": course, 'date': date },
                { $or: [{ name: "edx.forum.comment.created" }, { name: "edx.forum.response.created" }, { name: "edx.forum.thread.created" }] }
            ]
        }).countDocuments()
            .exec((err, numForos) => {
                if (err) reject("error on consult", err)
                else resolve({ x: date, y: numForos, group: 'Foros' })
            })
    })

}

function numContentByCourseDate(course, date) {

    return new Promise((resolve, reject) => {
        seguimiento.find({
            $and: [
                { "course": course, 'date': date },
                { $or: [{ name: "nav_content" }, { name: "nav_content_click" }, { name: "nav_content_prev" }, { name: "nav_content_next" }, { name: "nav_content_tab" }] }
            ]
        }).countDocuments()
            .exec((err, numContent) => {
                if (err) reject("error on consult", err)
                else resolve({ x: date, y: numContent, group: 'Contenido' })
            })
    })

}
// ==== get all exament data =====
function numExamenByCourseDate(course, date) {

    return new Promise((resolve, reject) => {
        seguimiento.find({
            $and: [
                { "course": course, 'date': date },
                { $or: [{ name: "problem_graded" }, { name: "problem_check" }] }
            ]
        }).countDocuments()
            .exec((err, numContent) => {
                if (err) reject("error on consult", err)
                else resolve({ x: date, y: numContent, group: 'Examenes' })
            })
    })

}


function buildStadisticsOfCourse(course) {

    return new Promise(async (resolve, reject) => {

        const days = await seguimiento.find({ "course": course }).distinct('date')

        if (days.length) {
            let generalData = [];
            let count = 0;

            for (const day of days) {

                Promise.all([
                    numVideosByCourseDate(course, day),
                    numContentByCourseDate(course, day),
                    numForosByCourseDate(course, day),
                    numExamenByCourseDate(course, day)
                ]).then(result => {

                        generalData.push(result[0], result[1], result[2], result[3]);
                        count++;

                        if (count === days.length) {
                            console.log('Fisnish');
                            resolve(generalData);
                        }
                    })
            }

        } else { resolve('') }
    })
}

module.exports = stadisticsByCourse;