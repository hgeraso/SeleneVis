const Docente = require('../models/docente');
var bcrypt = require('bcryptjs');

const mdAuth = require('../middlewares/tokenverification');

const docenteCtrl = {}; //he definido un objeto para luego aplicar metodos.
docenteCtrl.getDocentes = async (req, res) => {
    //res.send('HELLO HERMAN');
    /*res.json({
        status: 'docentes here'
    });*/
    const docentes = await Docente.find();
    res.json(docentes);



};

docenteCtrl.createDocente = async (req, res) => {
    console.log(req.body);
    const docent = new Docente(
        {
            name: req.body.name,
            course: req.body.course,
            correo: req.body.correo,
            password: bcrypt.hashSync(req.body.password, 10),
            credencial: req.body.credencial
        });

    docent.save().then(res => res.json({ status: 'Docente guardado' }))
        .catch(err => res.json({ status: err }))

}


docenteCtrl.getDocente = async (req, res) => {
    console.log(req.params.id)
    const docent = await Docente.findById(req.params.id);
    res.json(docent);
}

docenteCtrl.getDocenteByName = async (req, res) => {
    console.log(req.body)
    const body = req.body;
    const docent = await Docente.findById(body.email);
    res.json(docent);
}

docenteCtrl.editDocente = async (req, res) => {
    const { id } = req.params;
    const docent = {
        name: req.body.name,
        curso: req.body.curso,
        correo: req.body.correo,
        password: bcrypt.hashSync(req.body.password, 10),
        credencial: req.body.credencial
    }
    await Docente.findByIdAndUpdate(id, { $set: docent }, { new: true });
    res.json({
        "status": 'docente update'
    });
}

docenteCtrl.deleteDocente = async (req, res) => {
    await Docente.findByIdAndRemove(req.params.id);
    res.json({
        status: 'empleado Deleted'
    });
};



module.exports = docenteCtrl;
