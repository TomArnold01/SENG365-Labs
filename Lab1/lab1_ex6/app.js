const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('HTTP request: GET /');
});
app.post('/', (req, res) => {
    res.send('HTTP request: POST /');
});
app.put('/', (req, res) => {
    res.send('HTTP request: PUT /');
});
app.delete('/', (req, res) => {
    res.send('HTTP request: DELETE /');
});
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


// run these commands to test the code with curl
// "curl http://localhost:3000 -Method GET"
// "curl http://localhost:3000 -Method POST"
// "curl http://localhost:3000 -Method PUT"
// "curl http://localhost:3000 -Method DELETE"
