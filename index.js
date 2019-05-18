require('dotenv').config({path:__dirname + "/.env"});

const HandleArgs = require('./src/handleArgs');

HandleArgs.sendTGMsg();
