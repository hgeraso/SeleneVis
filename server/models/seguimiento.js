const mongoose = require('mongoose');
const {Schema}= mongoose;
const  seguimientoSchema= new Schema(); //El esquea es de tipo any dado que solo se requiere acceso de consulta a la coleccion.
module.exports = mongoose.model('seguimiento',seguimientoSchema);