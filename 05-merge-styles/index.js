
const fs = require('fs');
const path = require('path');
const dest = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err; 
  // console.log(files)

  files.forEach((file) => {
    let extnameFile = path.extname(file.name);
    if (file.isFile()  && extnameFile === '.css' ) {
      const readCSS = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      // pipe связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи
      readCSS.pipe(dest);
      // console.log(readCSS)
      // readCSS.on('data', (chunk) => {
      //   dest.write(chunk)
      // });
    }
  });
});