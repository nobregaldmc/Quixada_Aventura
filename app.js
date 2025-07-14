const express = require('express');
const path = require('path');

const basicAuth = require('express-basic-auth');

const homeRoute = require('./routes/home.route.js');
const tourPilotosRoute = require('./routes/tourpilotos.route.js'); 
const cursosParaVooRoute = require('./routes/cursosparavoo.route.js');
const turismoQuixadaRoute = require('./routes/turismoquixada.route.js');
const liveTrackingRoute = require('./routes/livetracking.route.js');
const blogRoute = require('./routes/blog.route.js');
const adminRoute = require('./routes/admin.route.js');
const apiRouter = require('./routes/api.route.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', homeRoute);
app.use('/tourpilotos', tourPilotosRoute);
app.use('/cursosparavoo', cursosParaVooRoute);
app.use('/turismoquixada', turismoQuixadaRoute);
app.use('/livetracking', liveTrackingRoute);
app.use('/blog', blogRoute);
app.use('/api', apiRouter);

app.use('/admin', basicAuth({
    users: { 'admin': 'admin' }, 
    challenge: true, 
    unauthorizedResponse: 'Acesso negado. Autenticação necessária.'
}));
app.use('/admin', adminRoute);

module.exports = app;