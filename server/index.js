const express = require('express');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
//setting

// script
const toDb = require('./app/SaveAllRegisters');

app.set('port', process.env.PORT || 4000);

//Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));


// Routes
app.use('/api/docentes', require('./routes/docente.routes'));
app.use('/api/seguimiento', require('./routes/seguimiento.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/studentts', require('./routes/studentt.routes'));
app.use('/api/indicators', require('./routes/indicator.routes'));
app.use('/api/statistics', require('./routes/statistics.routes'));
app.use('/api/prueba', require('./routes/prueba.routes'));
app.use('/api/grafos', require('./routes/grafos.routes'));
app.use('/api/course-stadistics', require('./routes/course-stadistics.routes'));
app.use('/api/login', require('./routes/login.routes'));






app.listen(app.get('port'), () => {

    console.log('server on port:', app.get('port'))
    // setInterval(function(){ toDb.saveInfo(); }, 10000);
    // toDb.saveInfo();
    
})