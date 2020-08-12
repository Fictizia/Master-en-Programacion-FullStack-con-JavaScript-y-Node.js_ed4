//Métodos para hacer acciones sobre la BBDD de firebase
const config = require('../config.js'),
filmDetails = require('../utils/movie_details'),
firebase = require('firebase'),
admin = require('firebase-admin');

firebase.initializeApp(config.firebase);


var db = firebase.firestore();


//Métodos de la base de datos
exports.getAll = () => {
  return new Promise ((resolve, reject) => {
    db.collection('films').get()
    .then((snapshot) => {
      
      console.log(snapshot.docs)
      resolve(snapshot.docs.map(doc => doc.data()));
    })
    .catch((err) => {
      console.log('Error getting documents');
      reject(err);
    });
  });
};

exports.get = id => {
  return new Promise (async (resolve, reject) => {

    db.collection('films').where("id", "==", id).get()
    .then((snapshot) => {
      resolve(snapshot.val());
    })
    .catch((err) => {
      console.log('Error in getById documents');
      reject(err);
    });
  });
};

exports.create = name => {
  return new Promise ((resolve, reject) => {
      filmDetails.filmDetails(name)
      .then((details=false) => {
        db.collection("films").add({name, details})
        .then( resolve() )
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};


// exports.remove = id => {
//   return new Promise (async (resolve, reject) => {
//     try{
    
//     }
//     catch(err){
//     }
//   });
// };


// exports.update = (id, newName) => {
//   return new Promise (async (resolve, reject) => {
//     try{
     
//     }
//     catch(err){
//     }
//   });
// };
