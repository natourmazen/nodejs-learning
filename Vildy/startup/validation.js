const winston = require('winston');

module.exports = function() {
    process.on('uncaughtException', (ex) => {
        winston.error(ex);
    });
    process.on('unhandledRejection', (ex) => {
        winston.error(ex);
    });
}