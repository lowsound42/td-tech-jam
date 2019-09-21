const express = require('express');
const dotenv = require('dotenv').config();
const data = require('./data/data.json');
const axios = require('axios');

const app = express();
app.use(express.json());


// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const util = require('util') // for printing objects
const req = require('request-promise-native'); // use Request library + promises to reduce lines of code
const apiKey = process.env.API_KEY;
console.log(apiKey)

const headers = {
    "Authorization": apiKey,
    'Content-Type': 'application/json',
  }

app.post('/test', (req, res) => {
    var data = req.body;
    axios.post('https://api.td-davinci.com/api/transfers', data, {
        headers: headers, 
})
    .then(response => obj = {
        amount: response.data.result.amount,
        code:  response.data.result.receipt
    })
    .then(response => console.log(response))
    .then(res.send());
})


app.listen(2112, () => console.log("Bro, we chillin at port 2112..."));
