const fs = require("fs");
const fse = require('fs-extra');


function copyAllFiles(from, to){
    return new Promise( resolve => {
        fse.copy(from, to)
            .then(() => resolve(true))
            .catch(err => console.error(err))
    })
}

module.exports = {
    copyFiles : copyAllFiles
};
