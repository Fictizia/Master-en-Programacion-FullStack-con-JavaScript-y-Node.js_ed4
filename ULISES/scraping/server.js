const {getAll, getById, getAllBySource} = require('./store')
const {job, downloader} = require('./scrap_job')

const schedule = require('node-schedule');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    
    const data = getAll()
    if(!data.length){
        return res.status(500).json({msg: `Databse is empty.`})
    }
    res.json(getAll())
});

app.get('/:id', (req, res) => {
    const {id} = req.params
    res.json(getById(id))
});

app.get('/source/:source', (req, res) => {
    const { source } = req.params
    const data = getAllBySource(source)

    if(!data.length){
        return res.status(404).json({msg: `Source:  ${source} is not available now.`})
    }

    res.json(data)
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

schedule.scheduleJob('42 * * * * *', async () => {
    await job()
    await downloader()

    .then(() => console.log("Database updated!"))
    .catch(console.error)
});