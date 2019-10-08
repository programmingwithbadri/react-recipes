const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE);

const app = express();
const PORT = process.env.PORT || 4444;

app.listen(PORT, ()=> {
    console.log(`Server is listening at port ${PORT}`)
});
