const express = require('express');
const got = require('got');

const app = express();

app.get('/', (req, res) => {
  res.json({msg:'Welcome to COVID19 Realtime APP!'});
});


app.get('/api/v1/news', (req, res) => {
    res.json({msg:'NEWS DATA'});
});

app.get('/api/v1/data', async (req, res) => {
    const data = await getData()
    res.json({msg:'DATA DATA', data});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


const getData = async () => {
    const response = await got('https://api.covid19api.com/summary');
    return JSON.parse(response.body)
}

