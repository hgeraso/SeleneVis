

const mongoose = require('mongoose');
/* mongoose.connect('mongodb://localhost/Mongoo', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!');
});
*/

const URI= 'mongodb://localhost/selene';
mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then( db => console.log('Db is connect'))
    .catch( err=> console.error(err));


module.exports= mongoose;
