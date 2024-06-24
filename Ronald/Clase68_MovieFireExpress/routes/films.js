const config = require('../config'),
      firebase = require('firebase'), 
      fetch = require('node-fetch')

firebase.initializeApp(config.firebase);

var database = firebase.database().ref('/peliculas')


async function getAll(req,res){
    await database.once("value", (snapshot)=>{
        const data = snapshot.val();
        res.render('index.pug', {data});
     });
    
}
exports.getAll = getAll



exports.get = (req,res)=>{
    const id = req.params.id;
    let dataFilm = firebase.database().ref(`peliculas/${id}`)    

    dataFilm.on("value",function(snapshot){
        let filmData = snapshot.val();
        res.render('details.pug', {filmData});
        
    });
}


 
exports.create = (req,res)=>{
    const name = req.params.name;
    const url = `http://www.omdbapi.com/?t=${name}&apikey=${config.apikey}`;
    let ref = firebase.database().ref(`peliculas/${name}`)

    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.Response == "False"){
            console.log('pelicula no encontrada');                    
        }else{
            ref.set(data);
        }
        return data  
    })
    .then((data) => { 
        if(data.Response === 'False'){
            res.render('error.pug');
        }else{
            res.redirect(`/film/${name}`);
        }
    })
    .catch(err => res.status(500).render('error.pug', err));
}


exports.delete = (req,res)=>{
    const nameDelete = req.params.id;
    let ref = firebase.database().ref(`peliculas/${nameDelete}`);
    ref.remove();
    res.send(`borrada la pelicula ${nameDelete}`);
    res.redirect('/');
}

exports.update = (req,res)=>{
    res.send(`actualizada la pelicula ${req.params.id}`)
}


