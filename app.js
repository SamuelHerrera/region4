const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
require('dotenv').config();

// API file for interacting with neo4j
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(path.join(__dirname, '/landing/assest')));
app.use(express.static(path.join(__dirname, '/landing/assest/js')));
app.use(express.static(path.join(__dirname, '/landing/assest/js/vendor')));
app.use(express.static(path.join(__dirname, '/landing/assest/img')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/about')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/blog')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/home')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/icon')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/screenshot')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/team')));
app.use(express.static(path.join(__dirname, '/landing/assest/img/testmonial')));
app.use(express.static(path.join(__dirname, '/landing/assest/fonts')));
app.use(express.static(path.join(__dirname, '/landing/assest/css')));
app.use(express.static(path.join(__dirname, '/landing/assest/css/core')));
app.use(express.static(path.join(__dirname, '/landing/assest/css/icons')));
app.use(express.static(path.join(__dirname, '/landing/assest/css/plugins')));

app.use((req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});

// API location
app.use('/api', api);

// Send to landing
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, '/landing/index.html'));
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

//Set Port
const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
