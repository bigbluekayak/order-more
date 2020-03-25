const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');
const orders = require('./db/orders');


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(serveStatic(__dirname + "./client/dist"));

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.post('/api', (req, res) => {
    console.log(req.body);

    orders.create(req.body).then((order) => {
        res.json(order);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });

});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});