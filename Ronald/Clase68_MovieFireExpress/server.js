const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    rutas = require('./routes/films'),
    config = require('./config.js'),
    helmet = require('helmet'),
    app = express();

//para Morgan
const addRequestId = require('express-request-id')();
app.use(addRequestId);

morgan.token('id', function getId(req) {
    return req.id
});

//para servir los logs con Morgan
var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.set('view-engine', 'pug');
app.use(helmet())


// User
app.get('/', rutas.getAll);
app.get('/film/:id', rutas.get);
app.get('/create/:name', rutas.create);


// curl -d  -X POST http://localhost:8626/film/titanic/delete
//es importante que el nombre de la pelicula se haga en minusculas
app.post('/film/:id/delete', rutas.delete);
app.post('/film/:id/update', rutas.update);


app.listen(config.port)
console.log(`corriendo en ${config.port}`)