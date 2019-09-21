const express = require('express');
const dotenv = require('dotenv').config();
const database = require('./data/data.json');
const axios = require('axios');

const app = express();
app.use(express.json());


// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const apiKey = process.env.API_KEY;
console.log(apiKey)

const headers = {
    "Authorization": apiKey,
    'Content-Type': 'application/json',
  }

app.post('/query', (req, res) => {
    var data = req.body;
    axios.post('https://api.td-davinci.com/api/transfers', data, {
        headers: headers, 
})
    .then(response => {
        var json = (JSON.parse(response.data.result.receipt))
        var obj = {
            code:  json.code,
            inNeedOf: 'test',
        }
        return obj;
    })
    .then(response => {
        var tempArr; 
        for (let i = 0; i<database.length; i++){
            if (database[i].code == response.code){
                console.log(database[i].inNeedOf);
                tempArr = database[i].inNeedOf;
                break;
            } else continue;
        }
        res.json(tempArr);
    })
    .then(console.log(database))
})

app.post('/donate', (req, res) => {
    database.forEach(element => {
        if (element.code == req.body.code){
            element.inNeedOf.forEach(item => {
                if (item.category == req.body.category){
                    item.cash = item.cash + req.body.cash;
                }
            })
        } else console.log('whoops, read the documentation or something')
    })
        res.json(database);
    })



app.listen(2112, () => console.log("Bro, we chillin at port 2112..."));
