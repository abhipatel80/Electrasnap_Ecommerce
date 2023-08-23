require('dotenv').config('.env');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const cart = require('./routes/cartRoute');
const cors = require('cors');
const bodyparser = require('body-parser');

const port = process.env.PORT || 8000;
require('./db');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', cart);

app.listen(port, () => {
    console.log(`Application Listening on port ${port}`);
});
