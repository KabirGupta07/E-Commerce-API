const winston = require('winston');
const colorette = require('colorette')

// Extend winston Logger for overall Log management 
// and also manage the file transports using a 
// global config file for the variouslog level handling

class Logger {
    loggerClass
    constructor() { }

    constructor(name) {
        this.loggerClass = name
    }

}

module.exports = Logger