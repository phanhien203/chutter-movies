const express = require('express');
const app = require('express')();
const mysql = require('mysql2/promise');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./api/api')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

api.registerEndpoint(app)

var server = app.listen(port, () => console.log("Server running in port " + port));
