const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');
const cors = require('cors'); 
const bodyParser = require('body-parser');
//setting

app.set('port',process.env.PORT || 4000);

//Middlewares
 
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

//students router
var student_routes = require('./routes/student.routes');

// Routes
app.use('/api/docentes',require('./routes/docente.routes'));
app.use('/api/students', student_routes);
app.use('/api/seguimiento',require('./routes/seguimiento.routes'));
app.use('/api/courses',require('./routes/course.routes'));
app.use('/api/studentts',require('./routes/studentt.routes'));




app.listen(app.get('port'),()=>{

    console.log('server on port:', app.get('port'))

})