const seguimiento = require('../models/seguimiento');
const grafosController = {};

grafosController.getdataStudent = async (req, res) => {

    var course = req.body ? req.body.course : req.course;
    var student = req.body ? req.body.student : req.student;

    let activities = [];

    getActivities(student, course).then(activitiesb => activities = activitiesb);

    let nodes = await seguimiento.find({ "username": student, "course": course }).distinct('name');
    nodes = nodes.map((name, index) => {
        return { id: index, label: name }
    })

    const days = await seguimiento.find({ "username": student, "course": course }).distinct('date');

    // const activities = [{ username: "juan", name: "Signin" }, { username: "juan", name: "nav_content" }, { username: "juan", name: "play_video" }];

    // for (let index = 0; index < activities.length; index++) {

    //     if ((index + 1) <= (activities.length - 1) && nodes.length) {

    //         const element = nodes.find( obj => obj.label === activities[index].name )
    //         const elementnext = nodes.find( obj => obj.label === activities[index + 1].name )
    //         const edges = {
    //             to:element.id,
    //             nameto:element.label,
    //             from:elementnext.id,
    //             namefrom: elementnext.label
    //         }
    //         console.log(edges)

    //     }
    // }
    // res.json({ activities, nodes, days })
    console.log("empezando a construir");

    buildEdges(activities, nodes, days).then(nodesTotal => {

        res.json({ edges: nodesTotal, nodes })
    })
}

function getActivities(student, course) {
    return new Promise((resolve, reject) => {
        seguimiento.find({ "username": student, "course": course }, 'name date time').exec((err, activities) => {

            if (err) {
                reject("error", err);
            } else {
                resolve(activities);
            }
        })
    })
}

function buildEdges(activities, nodes, days) {

    let nodesTotal = [];
    let countActivities = 0;
    return new Promise((resolve, reject) => {
        days.forEach(async (day, indexDay) => {

            console.log("dia", day)
            // console.log("un ejemplo de activities", activities[0]._doc.date)
            // console.log("un ejemplo de activities", activities[0]._doc)
            // console.log("string", JSON.stringify(activities[0]))
            // console.log("json", JSON.parse(activities[0]))
            // console.log("sus keys", Object.keys(activities[0]))
            // console.log("tipo", typeof (activities[0]))
            // console.log("un node", nodes[0])
            // console.log("un node", Object.keys(nodes[0]))
            const activitiesbyDay = await activities.filter(activity => activity._doc.date === day);
            let nodesByDay = [];
            console.log("total actividades en ", day, activitiesbyDay.length);
            // console.log("una ctividad", activitiesbyDay[0])
            // console.log("una ctividad", Object.keys(activitiesbyDay[0]))

            if (activitiesbyDay.length) {
                // resolve("hola")
                for (let index = 0; index < activitiesbyDay.length; index++) {
                    countActivities++;
                    if ((index + 1) <= (activitiesbyDay.length - 1) && nodes.length) {

                        const element = nodes.find(obj => obj.label === activitiesbyDay[index]._doc.name);
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