const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('My Furever Pal!!')
});

app.listen(3000, () => {
    console.log('Listening on port 3000!')
});