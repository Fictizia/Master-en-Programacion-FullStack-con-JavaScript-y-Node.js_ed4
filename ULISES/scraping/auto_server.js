const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const lowdbApi = require('lowdb-api')

const app = express()
const file = path.join(__dirname, './db.json')
const options = {}

app.use(bodyParser.json())
app.use(lowdbApi(file, options))


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });