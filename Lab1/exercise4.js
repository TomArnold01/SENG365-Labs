const http = require('http');
const url = require('url');

const shoppingList = ['milk', 'bread', 'eggs', 'flour'];

http.createServer((request, response) => {
    const query = url.parse(request.url, true).query;
    const itemNum = parseInt(query.itemNum, 10);

    if (isNaN(itemNum) || itemNum < 0 || itemNum >= shoppingList.length) { // checks if a nummber, is more than 0 and is less than the list length
        response.statusCode = 400;
        response.end(`Invalid itemNum: ${query.itemNum}`);
        return;
    }

    const itemName = shoppingList[itemNum];

    response.writeHead(200, { 'Content-Type': 'text/plain' }); // 200 is the good repsonse code

    response.end(`The item at index ${itemNum} is ${itemName}.`);
}).listen(8080);

console.log('Server running at http://localhost:8080/');
