const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var path = require('path');
var serveStatic = require('serve-static');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + "/client/dist"));

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});