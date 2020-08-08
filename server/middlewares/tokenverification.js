var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

exports.tokenVerify = function (req, res, next) {
    // validar Token

    const token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: "token incorrecto",
                err
            })
        }

        req.docente = decoded.docente;
        next();
        
    })

}