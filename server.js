const express = require('express');
const dotenv = require('dotenv').config();
const database = require('./data/data.json');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";

const apiKey = process.env.API_KEY;

const headers = {
    "Authorization": apiKey,
    'Content-Type': 'application/json',
  }

  app.get('/data/', (req, res) => {
      res.json(database);
    }
)

app.get('/data/:id', (req, res) => {
    var code = req.params.id;
    for (let i = 0; i<database.length; i++){
        if (database[i].code == code){
            console.log(database[i]);
            res.send(database[i])
            break;
        } else continue;
    }
})

app.get('/query/:id', (req, res) => {
    var obj;
    var code = req.params.id;
    console.log(code);
    var tempArr; 
        for (let i = 0; i<database.length; i++){
            if (database[i].code == code){
                tempArr = database[i].needed;
                break;
            } else continue;
        }
        res.json(tempArr);
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
