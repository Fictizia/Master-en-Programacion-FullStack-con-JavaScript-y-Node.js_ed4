const data = require('./data.json')


const crypto = require('crypto')

let getHash = (txt) => crypto.createHash('md5').update(txt).digest("hex")
/*
console.log(getHash("https://pharmaphorum.com/news/babylon-makes-coronavirus-antibody-test-available-to-anyone-in-uk/"))
console.log(getHash("https://www.moneycontrol.com/news/india/covid-19-fight-heres-why-indian-healthcare-professionals-stand-to-benefit-under-new-us-congress-proposal-5271591.html"))
*/



let lastHash; // hash
const getNonNoticedNews = (articles) => {

    const hashedArticles = articles.map(article => ({...article, hash: getHash(article.url)}));
    const newArticles = []
    if(!lastHash) {
        lastHash = hashedArticles[0].hash;
        return hashedArticles
    };


    for (let i = 0; i < hashedArticles.length; i++) {
        const article = hashedArticles[i];
        if(lastHash === article.hash) {
            break;
        }
        newArticles.push(article)
    }

    if(newArticles[0]){
        lastHash = newArticles[0].hash;
    }
    
    return newArticles
}

console.log("Current Hash:", lastHash)
console.log("TOtal:", getNonNoticedNews(data.articles).length)
console.log("Current Hash:", lastHash)

/*
bbe1b2fadd3552cb3fe33d010014341d

2e1a8871d912d22a462c3215008dad6d
*/