const express = require('express'),
    app = express(),
    pool = require('./pool-factory'),
    connectionMiddleware = require('./connection-middleware'),
    bodyParser = require('body-parser');

// to receive json format
app.use(bodyParser.json());
// form data
// app.use(bodyParser.urlencoded({
//     extended : true
// }));

app.use(connectionMiddleware(pool));

app.use('/api', require('../src/controller/registration-controller'));

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({error : err.toString()});
});

// app.use('/public', express.static('src/public'));

module.exports = app;