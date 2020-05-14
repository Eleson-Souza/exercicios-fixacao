const fs = require('fs'); // File System
const util = require('util');

class Writer {
    constructor() {
        this.write = util.promisify(fs.writeFile);
    }

    async WriteFile(filepath, content) {
        try {
            await this.write(filepath, content);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = Writer;