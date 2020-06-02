require('dotenv').config()

const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const got = require('got');
const crypto = require('crypto');


const { NEWS_TOKEN } = process.env

app.listen(3000);

function handler (req, res) {
  fs.readFile(`${__dirname}/index.html`,
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

let socketHandler;

const ONE_MINUTE = 60000
setInterval(async () => {
    if(socketHandler) {
        //socketHandler.emit('check', new Date().getTime());

        //@Revisar: Proponer una alternativa con Promise.all()
        const data = await getData()
        socketHandler.emit('data', { data });

        const news = await getNews()
        socketHandler.emit('news', { news });
    }
}, 10000);


io.on('connection', async socket => {
  socketHandler = socket;
  /*
  const data = await getData()
  socket.emit('data', { data });
  const news = await getNews()
  socket.emit('news', { news });
  */
  /*
  socket.on('my other event', data => {
    console.log(data);
  });
  */
});

const downloadJson = async (url) => {
    const response = await got(url);
    return JSON.parse(response.body)
}

const getData = () => downloadJson('https://api.covid19api.com/summary');
const getNews = () => downloadJson(`http://newsapi.org/v2/everything?q=covid19&sortBy=publishedAt&apiKey=${NEWS_TOKEN}`)

let lastNewsPublished; // hash
const getNonNoticedNews = (articles) => {

    const hashedArticles = articles.map(article => ({...article, hash: getHash(article.url)}))
    console.log(hashedArticles)

    // Calcular y popular los hashes
    // Actulizar con la ultima noticia notificada
    // Array con las noticias no publicadas.
}
const getHash = (txt) => crypto.createHash('md5').update(txt).digest("hex")
