const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server à l'écoute sur le port ${port}`)
});
