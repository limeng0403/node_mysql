var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var taskContr = require('./controllers/task');

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function(req, res) {
    res.send('This is APIs server.');
});

app.get('/api/task/:page/:pagesize', function(req, res) {
    taskContr.getAll(req, res);
});

app.get('/api/task*', function(req, res) {
    taskContr.getAll(req, res);
});

app.post('/api/task', function(req, res) {
    taskContr.insert(req, res);
});

app.put('/api/task', function(req, res) {
    taskContr.update(req, res);
});

app.delete('/api/task', function(req, res) {
    taskContr.delete(req, res);
});

app.listen(3000);

var app1 = express();
app1.use(express.static(__dirname + '/public'));

app1.listen(3001);
