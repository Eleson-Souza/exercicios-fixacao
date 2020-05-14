const fs = require('fs');
const promisify = require('util').promisify;

class Reader {
    constructor() {
        this.read = promisify(fs.readFile);
    }

    async ReadFile(filepath) {
        try {
            return await this.read(filepath, {encoding: 'utf-8'});
        } catch(err) {
            return undefined;
        }
    }
}

module.exports = Reader;