const express = require('express');
const download = require('./api/download');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/api/download', download);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
