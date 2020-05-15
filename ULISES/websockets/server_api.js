require('dotenv').config()

const app = require('express')();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);

const got = require('got');

const { NEWS_TOKEN } = process.env

// Socket

io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', (data) => {
      console.log('my other event----:', data);
    });
});

// API Rest
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/v1/news', async (req, res) => {
    const data = await getNews()
    res.json({msg:'NEWS DATA', data});
});

app.get('/api/v1/data/:country', async (req, res) => {
    const { country } = req.params
    //const data = await getData()
    //@pending: https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#7934d316-f751-4914-9909-39f1901caeb8
    res.json({msg:'DATA DATA', data: country});
});

app.get('/api/v1/data', async (req, res) => {
    const data = await getData()
    res.json({msg:'DATA DATA', data});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


const downloadJson = async (url) => {
    const response = await got(url);
    return JSON.parse(response.body)
}

const getData = () => downloadJson('https://api.covid19api.com/summary');
const getNews = () => downloadJson(`http://newsapi.org/v2/everything?q=covid19&sortBy=publishedAt&apiKey=${NEWS_TOKEN}`)
