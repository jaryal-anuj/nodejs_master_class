
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url =require('url');

var workers = {};

workers.gatherAllChecks = function(){
    _data.list('checks',function(err, checks){
        if(!err && checks && checks.length > 0){
            //console.log(checks);
            checks.forEach(function(check){
                _data.read('checks',check,function(err, originalCheckData){
                    if(!err && originalCheckData){
                        workers.validateCheckData(originalCheckData);
                    }else{
                        console.log("Error : reading one of the checks's data");
                    }
                });
            });
        }else{
            console.log("Error : could not find any checks to process");
        }
    });
};

workers.validateCheckData = function(originalCheckData){
    originalCheckData = typeof(originalCheckData)=='object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length ==20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length ==10 ? originalCheckData.userPhone.trim() : false;

    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['https','http'].indexOf(originalCheckData.protocol) > -1? originalCheckData.protocol :false;

    originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length>0? originalCheckData.url.trim() :false;

    originalCheckData.method = typeof(originalCheckData.method) == 'string' && ['post','get', 'put', 'delete'].indexOf(originalCheckData.method) > -1? originalCheckData.method :false;

    originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length>0 ? originalCheckData.successCodes :false;

    originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && originalCheckData.timeoutSeconds % 1 === 0  && originalCheckData.timeoutSeconds >=1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds :false;
    
    originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up','down'].indexOf(originalCheckData.state) > -1? originalCheckData.state :'down';

    originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked :false;

    if(originalCheckData.id &&
        originalCheckData.userPhone && 
        originalCheckData.protocol && 
        originalCheckData.url && 
        originalCheckData.method && 
        originalCheckData.successCodes &&
        originalCheckData.timeoutSeconds){
            workers.performChecks(originalCheckData);
        }else{
            console.log("Error : One of the checks is not properly formatted, skipping it");
        }
};

workers.performChecks = function(originalCheckData){
    var checkOutcome = {
        'error':false,
        'responseCode':false
    }

    var outcomeSent = false;
    var parseUrl =url.parse(originalCheckData.protocol+"://"+originalCheckData.url,true);
    var hostName = parseUrl.hostname;
    var path = parseUrl.path;

    var requestDetails = {
        'protocol':originalCheckData.protocol+':',
        'hostname':hostName,
        'method':originalCheckData.method.toUpperCase(),
        'path':path,
        'timeout':originalCheckData.timeoutSeconds * 1000
    };

    var _moduleToUse = originalCheckData.protocol == 'http'?http:https;
    var req = _moduleToUse.request(requestDetails,function(res){
        var status = res.statusCode;
        checkOutcome.responseCode = status;
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('error',function(e){
        checkOutcome.error = {
            'error': true,
            'value':e
        };

        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('timeout',function(e){
        checkOutcome.error = {
            'error': true,
            'value':'timout'
        };

        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.end();
};


workers.processCheckOutcome= function(originalCheckData,checkOutcome){
    var state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up':'down';

    var alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true :false;

    var newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    _data.update('checks',newCheckData.id,newCheckData,function(err){
        if(!err){
            if(alertWarranted){
                workers.alertUserToStatusChange(newCheckData);
            }else{
                console.log("Check outcome has not changed, no alert needed");
            }
        }else{
            console.log("Error trying to save updates to one of the checks");
        }
    });
};

workers.alertUserToStatusChange = function(newCheckData){
    var msg = 'Alert: your check for '+newCheckData.method.toUpperCase()+' '+newCheckData.protocol+'://'+newCheckData.url+' is currently '+ newCheckData.state;

    helpers.sendTwilioSms(newCheckData.userPhone,msg, function(err){
        if(!err){
            console.log('Success : User was alerted to a status change in their check, via sms:',msg);
        }else{
            console.log('Error : Could not send sms alert to user who had a state change in their check');
        }
    });
};

workers.loop = function(){
    setInterval(function(){
        workers.gatherAllChecks();
    },1000*60);
};

workers.init =function(){
    workers.gatherAllChecks();
    workers.loop();
};

module.exports = workers;