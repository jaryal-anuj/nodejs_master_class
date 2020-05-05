

var async_hooks = require('async_hooks');
var fs = require('fs');

var targetExecutionContext =false;

var whatTimeIsIt = function(callback){
    setInterval(() => {
       fs.writeSync(1,'When the setInterval runs, the execution context is '+async_hooks.executionAsyncId()+'\n');
       callback(Date.now()); 
    }, 1000);
};

whatTimeIsIt(function(time){
    fs.writeSync(1,'The  time is '+time+'\n');
});

var hooks = {
    init(asyncId, type, triggerAsyncId, resource){
        fs.writeSync(1, "hooks init "+asyncId+"\n");
    },
    before(asyncId){
        fs.writeSync(1, "hooks before "+asyncId+"\n");
    },
    after(asyncId){
        fs.writeSync(1, "hooks after "+asyncId+"\n");
    },
    onDestroy(asyncId){
        fs.writeSync(1, "hooks destroy "+asyncId+"\n");
    },
    promiseResolved(asyncId){
        fs.writeSync(1, "hooks promiseResolve "+asyncId+"\n");
    },
};

var asyncHook = async_hooks.createHook(hooks);
asyncHook.enable();