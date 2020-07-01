const seguimiento = require('../models/seguimiento');
const grafosController = {};

grafosController.getGrafosStudentByDay = async (req, res) => {

    var course = req.body ? req.body.course : req.course;
    var student = req.body ? req.body.student : req.student;

    Promise.all([
        getActivities(student, course),
        getAllNodes(student, course),
        getDays(student, course)
    ]).then(responses => {

        const activities = responses[0];
        const nodes = responses[1];
        const days = responses[2];
        buildEdges(activities, nodes, days, 'day').then(nodesTotal => {

            res.json({ edges: nodesTotal, nodes, options:days })
        })
        // res.json({nodes})
    })

}
// ===== grafos by sessions ========
grafosController.getGrafosStudentBySession = async (req, res) => {

    var course = req.body ? req.body.course : req.course;
    var student = req.body ? req.body.student : req.student;

    Promise.all([
        getActivities(student, course),
        getAllNodes(student, course),
        getSessions(student, course)
    ]).then(responses => {

        const activities = responses[0];
        const nodes = responses[1];
        const days = responses[2];
        buildEdges(activities, nodes, days, 'session').then(nodesTotal => {

            res.json({ edges: nodesTotal, nodes, options:days })
        })
        // res.json({nodes})
    })

}

// ==== funtion get all activities =====
function getActivities(student, course) {

    return new Promise((resolve, reject) => {
        seguimiento.find({ "username": student, "course": course }, 'session name date time')
            .sort('date')
            .exec((err, activities) => {

                if (err) {
                    reject("error", err);
                } else {
                    agrupingActivities(activities).then(() => {
                        resolve(activities)
                    })
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

// ===== function get all sessions =====}
function getSessions(student, course) {

    return new Promise((resolve, reject) => {
        seguimiento.find({ course: course, username: student }).distinct('session')
            .exec((err, sessions) => {

                if (err) reject("error", err);
                else resolve(sessions);
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
                    agoupingNodes(nodes).then((newNodes) => resolve(newNodes));
                }
            })
    })
}

function agrupingActivities(activities) {

    return new Promise((resolve, reject) => {
        let count = 0;
        let newArrayActivities = [];
        for (let activity of activities) {
            // activity = {name date time}
            count++;
            if (activity._doc.name === "nav_content" || activity._doc.name === "nav_content_prev" || activity._doc.name === "nav_content_click"
                || activity._doc.name === "nav_content_next" || activity._doc.name === "nav_content_tab") {
                activity._doc.name = 'contenidos'

            } else if (activity._doc.name === "stop_video" || activity._doc.name === "pause_video" || activity._doc.name === "play_video") {
                activity._doc.name = 'videos';

            } else if (activity._doc.name === "Signin") {
                activity._doc.name = 'Home';

            } else if (activity._doc.name === "problem_graded" || activity._doc.name === "problem_check") {
                activity._doc.name = "examenes";

            } else if (activity._doc.name === "edx.forum.comment.created" || activity._doc.name === "edx.forum.response.created" || activity._doc.name === "edx.forum.thread.created") {
                activity._doc.name = 'foros';

            }

            // newArrayActivities.push(activity)
            if (count == (activities.length)) {
                resolve()
            }
        }
    })
}

function agoupingNodes(nodes) {
    let count = 0;
    let activityByNode = {
        contenidos: [],
        videos: [],
        Home: [],
        examenes: [],
        foros: []
    }
    return new Promise((resolve, reject) => {

        nodes = nodes.filter((el, index) => nodes.indexOf(el) === index);

        nodes = nodes.map((name) => {
            // return { id: index, label: name }
            if (name === "nav_content" || name === "nav_content_prev" || name === "nav_content_click" || name === "nav_content_next" || name === "nav_content_tab") {
                activityByNode.contenidos.push(name);
                name = 'contenidos';
            } else if (name === "stop_video" || name === "pause_video" || name === "play_video") {
                activityByNode.videos.push(name);
                name = 'videos';
            } else if (name === 'Signin') {
                activityByNode.Home.push(name);
                name = 'Home'

            } else if (name === "problem_graded" || name === "problem_check") {
                activityByNode.examenes.push(name);
                name = "examenes";

            } else if (name === "edx.forum.comment.created" || name === "edx.forum.response.created" || name === "edx.forum.thread.created") {
                activityByNode.foros.push(name);
                name = 'foros';

            }

            count++;
            return name;
        })

        if (count == nodes.length) {

            nodes = nodes.filter((el, index) => nodes.indexOf(el) === index);
            let count2 = 0;
            let newNodes = [{ id: -1, label: 'login' }]
            for (let name of nodes) {
                activityByNode[name] = activityByNode[name].filter((el, index) => activityByNode[name].indexOf(el) === index);
                const title = activityByNode[name].join(', ')
                count2++;
                newNodes.push({ id: count2, label: name, title: title })
            }

            if (count2 == nodes.length) {
                newNodes.push({ id: -2, label: 'logOut' });
                resolve(newNodes);;
            }
        }
    })
}

function buildEdges(activities, nodes, days, control) {

    let nodesTotal = [];
    let countActivities = 0;

    return new Promise((resolve, reject) => {

        days.forEach(async (day, indexDay) => {

            // console.log("este es una actividad", activities[1], Object.keys(activities[1]))
            let activitiesByControl = [];
            if (control === 'day') {

                activitiesByControl = await activities.filter(activity => activity._doc.date === day);
            } else {
                activitiesByControl = await activities.filter(activity => activity._doc.session === day);
            }

            let nodesByDay = [{
                id: '-11',
                to: 1,
                nameto: 'home',
                from: -1,
                namefrom: 'login',
                visits: 1
            }];
            // console.log("total actividades en ", day, activitiesbyDay.length);

            if (activitiesByControl.length) {

                for (let index = 0; index < activitiesByControl.length; index++) {
                    countActivities++;
                    if ((index + 1) <= (activitiesByControl.length - 1) && nodes.length) {

                        const element = nodes.find(obj => obj.label === activitiesByControl[index]._doc.name);
                        const elementnext = nodes.find(obj => obj.label === activitiesByControl[index + 1]._doc.name);
                        const edge = {

                            id: `${element.id}${elementnext.id}`,
                            to: elementnext.id,
                            nameto: elementnext.label,
                            from: element.id,
                            namefrom: element.label,
                            label: '1',
                            visits: 1
                        }

                        if (!nodeWasAdded(edge.id, nodesByDay)) {
                            nodesByDay.push(edge);
                        }

                    }
                    if (index === (activitiesByControl.length - 1)) {
                        const length = nodesByDay.length - 1;
                        const objedge = {
                            id: '-2',
                            to: -2,
                            nameto: 'logOut',
                            from: nodesByDay[length].to,
                            namefrom: nodesByDay[length].nameto,
                            visits: 1
                        }
                        nodesByDay.push(objedge);

                        nodesTotal.push({ day: day, nodes: nodesByDay })
                    }

                    if (indexDay === (days.length - 1) && countActivities === (activities.length - 1)) {
                        // console.log("se reaolvio", indexDay, "num avtivities", countActivities);
                        resolve(nodesTotal);
                    }
                }
            } else {
                resolve(nodesTotal);
            }
        });
    })

}

function nodeWasAdded(idnode, nodes) {

    const itemOnArray = nodes.find(node => node.id === idnode);
    if (itemOnArray) {
        itemOnArray.visits += 1;
        itemOnArray.label = (parseInt(itemOnArray.label) + 1).toString();
        return true;
    } else {
        return false;
    }
}

module.exports = grafosController;