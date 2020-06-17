// https://www.elmundotoday.com/noticias/tecnologia/
const { v4: uuidv4 } = require('uuid');
const {writeFileSync} = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const got = require('got');


const genbetaScrapper = async () => {
    const {body} = await got('https://www.genbeta.com/categoria/desarrollo');
    //writeFileSync("./genbeta.html", body)
    const dom = new JSDOM(body);
    const document = dom.window.document;
    const data = Array.from(document.querySelectorAll(".abstract-article")).map(item => {
        return {
            id: uuidv4(),
            title: item.querySelector('.abstract-title > a').textContent,
            url: item.querySelector('.abstract-title > a').href,
            thumb: item.querySelector("picture > img").src,
            source: "Genbeta Dev",
            category: "Coding"
        }});
    writeFileSync("./genebeta.json", JSON.stringify(data, null, 2))
    return data
    //console.log(titles)
};


const elmundotodayScrapper = async () => {
    const {body} = await got('https://www.elmundotoday.com/noticias/tecnologia/');
    writeFileSync("./web.html", body)
    const dom = new JSDOM(body);
    const document = dom.window.document;
    const data = Array.from(document.querySelectorAll(".td-module-thumb > a")).map(item => {
        return {
            id: uuidv4(),
            title: item.title,
            url: item.href,
            thumb: item.querySelector("img").src,
            source: "El mundo today",
            category: "Humor"
        }});
    writeFileSync("./elmundotoday.json", JSON.stringify(data, null, 2))
    return data
    //console.log(titles)
};


module.exports = {
    genbetaScrapper,
    elmundotodayScrapper
}