
var helpers = require('./../lib/helpers');
var assert = require('assert');

_app = {};

_app.tests = {
    'unit':{}
};

// assrt that the getANumber function is returning a number
_app.tests.unit['helpers.getANumber should return number']= function(done){
    var val = helpers.getANumber();
    assert.equal(typeof(val),'number');
    done();
};

// assrt that the getANumber function is returning a 1
_app.tests.unit['helpers.getANumber should return 1']= function(done){
    var val = helpers.getANumber();
    assert.equal(val,1);
    done();
};

// assrt that the getANumber function is returning a 2
_app.tests.unit['helpers.getANumber should return 2']= function(done){
    var val = helpers.getANumber();
    assert.equal(val,2);
    done();
};

_app.countTests = function(){
    var counter =0;
    for(var key in _app.tests){
        if(_app.tests.hasOwnProperty(key)){
            var subTests = _app.tests[key];
            for(var testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    counter++;
                }
            }
        }
    }

    return counter;
};


_app.runTests = function(){
    var errors = [];
    var successes = 0;
    var limit = _app.countTests();
    var counter = 0;
    for(var key in _app.tests){
        if(_app.tests.hasOwnProperty(key)){
            var subTests = _app.tests[key];
            for(var testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    (function(){
                        var tmpTestName = testName;
                        var testValue = subTests[testName];
                        try{
                            testValue(function(){
                                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                                counter++;
                                successes++;
                                if(counter == limit) {
                                    _app.produceTestReport(limit, successes, errors);
                                }
                            });
                        }catch(e){
                            errors.push({
                                'name': testName,
                                'error':e
                            });
                            console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                            counter++;
                            if(counter == limit){
                                _app.produceTestReport(limit, successes, errors);
                            }
                        }
                    })();
                }
            }
        }
    }
};

_app.produceTestReport = function(limit, successes, errors){
    console.log('');
    console.log("------------------BEGIN TEST REPORT ----------------");
    console.log("");
    console.log('Total Tests', limit);
    console.log('Pass', successes);
    console.log('Fail', errors.length);
    console.log("");

    if(errors.length > 0){

        console.log("------------------BEGIN ERROR DETAIL ----------------");

        console.log("");
        errors.forEach(testError => {
            console.log('\x1b[31m%s\x1b[0m',testError.name);
            console.log(testError.error);
            console.log("");
        });

        console.log("------------------END ERROR DETAIL ----------------");
    }

    console.log('');
    console.log("------------------END TEST REPORT ----------------");
};


_app.runTests();