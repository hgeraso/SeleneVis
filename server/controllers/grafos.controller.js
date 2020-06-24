const seguimiento = require('../models/seguimiento');
const grafosController = {};

grafosController.getdataStudent = async (req, res) => {

    var course = req.body ? req.body.course : req.course;
    var student = req.body ? req.body.student : req.student;

    // ===== activities =====
    // getActivities(student, course).then(activitiesb => activities = activitiesb);

    // ===== nodes =====
    // let nodes = await seguimiento.find({ "username": student, "course": course }).distinct('name');
    // nodes = nodes.map((name, index) => {
    //     return { id: index, label: name }
    // })
    // getAllNodes(student, course).then(nodesa => nodes = nodesa);

    Promise.all([
        getActivities(student, course),
        getAllNodes(student, course),
        getDays(student, course)
    ]).then(responses => {

        const activities = responses[0];
        const nodes = responses[1];
        const days = responses[2]
        buildEdges(activities, nodes, days).then(nodesTotal => {

            res.json({ edges: nodesTotal, nodes })
        })
        // res.json({nodes})
    })
    // ===== Days =====
    // const days = await seguimiento.find({ "username": student, "course": course }).distinct('date');

    // ====== get nodes =====
    // console.log("empezando a construir");
    // buildEdges(activities, nodes, days).then(nodesTotal => {

    //     res.json({ edges: nodesTotal, nodes })
    // })
}

// ==== funtion get all activities =====
function getActivities(student, course) {
    return new Promise((resolve, reject) => {
        seguimiento.find({ "username": student, "course": course }, 'name date time')
            .sort('date')
            .exec((err, activities) => {

                if (err) {
                    reject("error", err);
                } else {
                    resolve(activities);
                }
            })
    })
}

// ==== funtion get all diferents days =====
function getDays(student, course) {
    return new Promise((resolve, reject) => {
        seguimiento.find({ "username": student, "course": course }).distinct('date')
            .exec((err, days) => {
                if (err) {
                    reject("error", err);
                } else {
                    resolve(days);
                }
            })
    })
}

// ==== funtion get all nodes =====
function getAllNodes(student, course) {
    return new Promise((resolve, reject) => {
        seguimiento.find({ "username": student, "course": course }).distinct('name')
            .exec((err, nodes) => {

                if (err) {
                    reject("error", err);
                } else {
                    nodes = nodes.map((name, index) => {
                        return { id: index, label: name }
                    })
                    resolve(nodes);
                }
            })
    })
}

function buildEdges(activities, nodes, days) {

    let nodesTotal = [];
    let countActivities = 0;

    console.log("este es un nuevo nodo", nodes[0])
    console.log("este es un nuevo nodo", nodes[0].label)
    console.log("sus key",Object.keys(nodes[0]))
    return new Promise((resolve, reject) => {
        // resolve("hola")
        days.forEach(async (day, indexDay) => {

            console.log("dia", day)

            const activitiesbyDay = await activities.filter(activity => activity._doc.date === day);
            let nodesByDay = [];
            console.log("total actividades en ", day, activitiesbyDay.length);

            if (activitiesbyDay.length) {

                for (let index = 0; index < activitiesbyDay.length; index++) {
                    countActivities++;
                    if ((index + 1) <= (activitiesbyDay.length - 1) && nodes.length) {

                        const element = nodes.find(obj => obj.label=== activitiesbyDay[index]._doc.name);
                        const elementnext = nodes.find(obj => obj.label === activitiesbyDay[index + 1]._doc.name);
                        const edge = {
                            to: element.id,
                            nameto: element.label,
                            from: elementnext.id,
                            namefrom: elementnext.label
                        }
                        nodesByDay.push(edge);

                    }
                    if (index === (activitiesbyDay.length - 1)) {
                        console.log({ day: day, nodes: nodesByDay })
                        nodesTotal.push({ day: day, nodes: nodesByDay })
                    }

                    if (indexDay === (days.length - 1) && countActivities === (activities.length - 1)) {
                        console.log("se reaolvio", indexDay, "num avtivities", countActivities);
                        resolve(nodesTotal);
                    }
                }
            } else {
                resolve(nodesTotal);
            }
        });
    })

}

module.exports = grafosController;