process.env.TZ = "America/Sao_Paulo";

const express = require('express');
const consign = require('consign');
var bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


process.setMaxListeners(0);

const app = express();

var moment = require('moment');

app.locals.moment = moment;
// require('./src/monitorar');

console.log(`O servidor ficou on no dia: ${moment(new Date()).format('DD/MM/YYYY HH:mm:ss')}`);

app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});

app.set('view engine', 'ejs');

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


consign().then('./controllers').then('./routes').into(app);


app.listen(3000);
