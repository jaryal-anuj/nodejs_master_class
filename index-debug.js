var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var exampleDebugginProblem = require('./lib/exampleDebuggingProblem');


var app={};

app.init = function(){
    debugger;
    server.init();
    debugger;

    debugger;
    workers.init();
    debugger;

    debugger;
    setTimeout(function(){
        cli.init();
    },50);
    debugger;

    debugger;
    var foo = 1;
    console.log('assign 1 to foo');
    debugger;
    foo++;
    console.log('increment foo');
    debugger;
    foo = foo* foo;
    console.log('just squared foo');
    debugger;
    foo = foo.toString();
    console.log('just converted foo to string');
    debugger;
    exampleDebugginProblem.init();
    console.log('ajust called the library');
    debugger;
};

app.init();

module.exports = app;