
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    let fileArg  = path.join(__dirname, 'secret-folder', file.name);
    fs.stat(fileArg, (err, stats) => {
      if (err) throw err;

      if (file.isFile()) {
        let nameFile = (file.name).replace(path.extname(file.name), '');
        let extnameFile = path.extname(file.name).slice(1);
        console.log (`${nameFile} - ${extnameFile} - ${stats.size}b`);
      }
    });
  }
});