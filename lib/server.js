/**
 * Primary file for th API
 * 
 * 
 */


 //Dependencies
 var http = require('http');
 var https = require('https');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;
 var config = require('./config');
 var fs = require('fs');
 var handlers = require('./handlers');
 var helpers = require('./helpers');
 var path = require('path');
 var util = require('util');
var debug = util.debuglog('server');

 var server = {};
 
//  helpers.sendTwilioSms('9041475887','Hello', function(err){
//     console.log(err);
//  });


 //The server should respond to all requests with a string
server.httpServer = http.createServer(function(req, res){
    server.unifiedServer(req,res)

});

 server.httpServerOptions = {
     'key':fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
     'cert':fs.readFileSync(path.join(__dirname,'/../https/cert.pem')),
 }

 server.httpsServer = https.createServer(server.httpServerOptions,function(req, res){
    server.unifiedServer(req,res)

});




server.unifiedServer = function(req, res){
        // Get the URL, and parse it
        var parseUrl = url.parse(req.url, true);

        // Get the path
        var path = parseUrl.pathname;
        var trimmedPath = path.replace(/^\/+|\/+$/g,'');
    
        //Get the query  string as an object
        var queryStringObject = parseUrl.query;
    
        // Get the HTTP method
        var method = req.method.toLowerCase();
    
        // Get the headers as  an object
        var headers = req.headers;
    
        // Get the payloads, if any
        var decoder = new StringDecoder('utf-8');
        var buffer = '';
        req.on('data', function(data){
            buffer += decoder.write(data);
        });
    
        req.on('end',function(){
            buffer+= decoder.end();
            // choose the handler this request should got to, if one is not found choos notFoundHandler
            var choosenHandler = typeof(server.router[trimmedPath]) !== 'undefined'? server.router[trimmedPath]:handlers.notFound;
    
            //construct the data object to send to the handler
            var data = {
                'trimmedPath':trimmedPath,
                'queryStringObject':queryStringObject,
                'method':method,
                'headers':headers,
                'payload':helpers.parseJsonToObject(buffer)
            };
    
            // Route the request to the handler specified in the router
            choosenHandler(data, function(statusCode, payload){
                statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
                payload = typeof(payload) == 'object' ? payload : {};
                var payloadString = JSON.stringify(payload);
    
                res.setHeader('Content-type','application/json');
                res.writeHead(statusCode);
                res.end(payloadString);
                // Log the request path
                if(statusCode == 200){
                    debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
                }else{
                    debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
                }
            });
            
        });
       
}





 // Definde a request router
 server.router = {
     'ping':handlers.ping,
     'users':handlers.users,
     'tokens':handlers.tokens,
     'checks':handlers.checks
 };

 server.init = function(){
     // Start the server, and have it listen on port 3000
    server.httpServer.listen(config.httpPort, function(){
        console.log('\x1b[36m%s\x1b[0m', "The server is listening on port "+config.httpPort);
    });
    server.httpsServer.listen(config.httpsPort, function(){
        console.log('\x1b[31m%s\x1b[0m', "The server is listening on port "+config.httpsPort);
     });
 };

 module.exports = server;