const dotenv = require('dotenv');

dotenv.config(); //Cargar fichero configuracion

module.exports = {
  port : process.env.PORT,
  apikey: process.env.API_KEY_FILM,
  firebase : {
    apiKey: process.env.API_KEY,
    authDomain: process.env.API_DOMAIN,
    databaseURL: process.env.API_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appID: process.env.APP_ID
  }
}