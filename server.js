const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config_Secret');
var cors = require('cors');
var app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.set('api_secret_key', config.api_secret_key);

app.get('/checking', function(req, res){
   res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial"
   });
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to REST API GAME SERVER. "});
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/inventory.routes.js')(app);
require('./app/routes/job.routes.js')(app);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
