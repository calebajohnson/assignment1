var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

/*
	Request handler sends listingData in the JSON format as a response if a GET request
	is sent to the 'listings' path. Otherwise, it sends a 404 error.
*/
var requestHandler = function(request, response) {
	var parsedUrl = url.parse(request.url);

	// If GET request & URL path is listings, send JSON data
	if(request.method == 'GET' && parsedUrl.pathname == '/listings')
	{
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write(listingData);
	}

	// Else send 404 error
	else
	{
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write("Bad gateway error");
	}

   response.end();
};

//Saves the data from listings.json in the listingData variable, then starts the server.
fs.readFile('listings.json', 'utf8', function(err, data) {
		//Check for errors
    	if (err) throw err;
  

   		//Saves the data in the listingData variable already defined
   		listingData = data;
  

  		//Creates the server
  		server = http.createServer(requestHandler);
  
  		//Starts the server
 		server.listen(port);
	}
);
