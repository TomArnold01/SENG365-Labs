const http = require('http');
const URL = require('url').URL;

http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const parameters = url.searchParams;
    // Write the response
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end(`Here is your data: ${parameters}`);
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');



// To get params, they need to be after the url with /?name...
// eg http://127.0.0.1:8081/?name=Thomas_Arnold to get this output: "Here is your data: name=Thomas_Arnold"