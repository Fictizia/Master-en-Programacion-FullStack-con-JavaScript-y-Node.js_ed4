dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    apikey: process.env.API_KEY_FILM,
    firebase : {
        apiKey: process.env.API_KEY,
        authDomain: process.env.API_DOMAIN,
        databaseURL: process.env.API_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.SENDER_ID,
        appId: process.env.API_ID
      }
}