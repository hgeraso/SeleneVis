const Docente = require('../models/docente');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const loginCTRL = {};

loginCTRL.login = async (req, res) => {

    const body = req.body;

    Docente.findOne({ correo: body.email }, (err, docenteBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: "error buscando usuario",
                err
            })
        }

        if (!docenteBD) {

            return res.status(400).json({
                ok: false,
                message: "credenciales incorrectas",
                err
            })
        }

        if (!bcrypt.compareSync(body.password, docenteBD.password)) {
            return res.status(400).json({
                ok: false,
                message: "credenciales incorrectas",
                err
            })
        }

        // crear Token!!!
        docenteBD.password = ':)'
        const token = jwt.sign({ docente: docenteBD }, SEED , { expiresIn: 14400 }) //4horas

        res.status(200).json({
            ok: true,
            usuario: docenteBD,
            token,
            id: docenteBD._id
        })
    })


}

module.exports = loginCTRL;
