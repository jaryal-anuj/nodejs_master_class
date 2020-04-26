/**
 * Primary file for th API
 * 
 * 
 */


 //Dependencies
 var http = require('http');
 var url = require('url');

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

    // Get the headers as  an objec
    var headers = req.headers;

    // Send the response
    res.end("Hello world");

    // Log the request path
    console.log("Request received with these headers : "+JSON.stringify(headers));

});


 // Start the server, and have it listen on port 3000
 server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
 });