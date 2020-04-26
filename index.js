/**
 * Primary file for th API
 * 
 * 
 */


 //Dependencies
 var http = require('http');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;

 //The server should respond to all requests with a string
var server = http.createServer(function(req, res){
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
        var choosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath]:handlers.notFound;

        //construct the data object to send to the handler
        var data = {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
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
            console.log("we are returning this response : ",statusCode,payloadString);
        });
        
    });

   

});


 // Start the server, and have it listen on port 3000
 server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
 });
//Define the handlers
var handlers={};

//sample handlers
handlers.sample = function(data, callback){
    // callback a http status code, and a payload object
    callback(406,{'name':'sample handler'});
};

//Not found handler 
handlers.notFound = function(data, callback){
    callback(404);
};

 // Definde a request router
 var router = {
     'sample':handlers.sample
 };