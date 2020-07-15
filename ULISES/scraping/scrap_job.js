const  {genbetaScrapper, elmundotodayScrapper} = require('./scrappers')
const {save} = require('./store')
const got = require('got');

const job = () => Promise.all([genbetaScrapper(), elmundotodayScrapper()])
.then(articles => articles.flat().forEach(save))
.catch(console.error)

const downloader = async () => {
    console.log("Multimedia download has finished")
    // Bajame todos los articulos
    // promise.all or FOR...
    // descargar img. 
    // subirlo a un CDN...
    // actualizar el store  con la NUEVA url del CDN
}

module.exports = {
    job, downloader
}