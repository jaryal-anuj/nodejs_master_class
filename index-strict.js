"use strict";
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');


var app={};

foo='bar';

app.init = function(){
    server.init();

    workers.init();

    setTimeout(function(){
        cli.init();
    },50);
};

app.init();

module.exports = app;