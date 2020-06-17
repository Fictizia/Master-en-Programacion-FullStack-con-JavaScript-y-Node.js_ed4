const filmModel = require('../models/films');

exports.getAllFilms = (req, res) => {
  filmModel.getAll()

  .then(data => {
    console.log('desde films/routes => ', data)
    res.render('index.pug', {data})
    
  })
  .catch(err => res.status(500).render('error.pug', err));
};

exports.getFilm = (req, res) => {
  
  const id = req.params.id;
  filmModel.get(id)

  .then(data => {
    res.render(data ? 'details.pug': 'error.pug', {data})
  })
  .catch(err => res.status(500).render('error.pug', err));
};

exports.createFilm = (req, res) => {
  const name = req.params.name;
  filmModel.create(name)

  .then(data => res.redirect('/'))
  .catch(err => res.status(500).render('error.pug', err));
};

exports.destroyFilm = (req, res) => {
  const id = req.params.id;
  filmModel.remove(id)

  .then(() => res.send('POST send successfully'))
  .catch(err => res.status(500).render('error.pug', err));
};

exports.updateFilm = (req, res, next) => {
  const id = req.params.id;
  const newName = req.body.name;
  filmModel.update(id, newName)
  .then(() => res.send('POST UPDATE succesfuly'))
  .catch(err => res.status(500).render('error.pug', err));
};
