var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();

var cli = {};

e.on('man',function(str){
    cli.responders.help();
});

e.on('help',function(str){
    cli.responders.help();
});

e.on('exit',function(str){
    cli.responders.exit();
});

e.on('stats',function(str){
    cli.responders.stats();
});

e.on('list users',function(str){
    cli.responders.listUsers();
});

e.on('more user info',function(str){
    cli.responders.moreUserInfo(str);
});

e.on('list checks',function(str){
    cli.responders.listChecks(str);
});

e.on('more check info',function(str){
    cli.responders.moreCheckInfo(str);
});

e.on('list logs',function(str){
    cli.responders.listLogs();
});

e.on('more lig info',function(str){
    cli.responders.moreLogInfo(str);
});

cli.responders = {};

cli.responders.help = function(){
    console.log("you asked for help");
}

cli.responders.exit = function(){
    console.log("you asked for exit");
}

cli.responders.stats = function(){
    console.log("you asked for stats");
}

cli.responders.listUsers = function(){
    console.log("you asked for listUsers");
}

cli.responders.moreUserInfo = function(str){
    console.log("you asked for moreUserInfo",str);
}

cli.responders.listChecks = function(str){
    console.log("you asked for listChecks",str);
}

cli.responders.moreCheckInfo = function(str){
    console.log("you asked for moreCheckInfo",str);
}

cli.responders.listLogs = function(){
    console.log("you asked for listLogs");
}

cli.responders.moreLogInfo = function(str){
    console.log("you asked for moreLogInfo",str);
}


cli.processInput = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    if(str){
        var uniqueInputs=[
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list check',
            'list check info',
            'list logs',
            'more logs info'
        ];

        var matchFound = false;
        var counter =0;
        uniqueInputs.some(function(input){
            if(str.toLowerCase().indexOf(input) > -1){
                matchFound =true;
                e.emit(input,str);
                return true;
            }
        });

        if(!matchFound){
            console.log('Sorry, try again');
        }
    }
}

cli.init = function(){
    console.log('\x1b[34m%s\x1b[0m', "The cli is runnig");
    var _interface = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:''
    });
    _interface.prompt();

    _interface.on('line',function(str){
        cli.processInput(str);
        _interface.prompt();
    });

    _interface.on('close',function(){
        process.exit(0);
    });
};


module.exports = cli;