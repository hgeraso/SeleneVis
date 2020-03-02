const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');
const cors = require('cors'); 
//setting

app.set('port',process.env.PORT || 4000);

//Middlewares
 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));


// Routes
app.use('/api/docentes',require('./routes/docente.routes'));
app.use('/api/seguimiento',require('./routes/seguimiento.routes'))



app.listen(app.get('port'),()=>{

    console.log('server on port:', app.get('port'))

})