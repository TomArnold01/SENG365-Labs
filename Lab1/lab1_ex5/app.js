/*
This creates a local page, using express

must be on port 3000 like this http://localhost:3000/ anything else will result in a 404 message

like this http://localhost:3000/test will result in a 404 message. 
\*/

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Simon!');
});

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});