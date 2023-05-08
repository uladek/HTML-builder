const fs = require('fs');
const path = require('path');

//для последовательного вложения папок {recursive: true}
fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
  if (err) throw err; 
});


// удалениеиз копифолдер
fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
      if (err) throw err;
    });
  });
});


fs.readdir(path.join(__dirname, 'files'), {recursive: true}, (err, files) => {
  if (err) throw err; 
  // console.log(path.join(__dirname, 'files'));

  files.forEach((file) => {
    // console.log(file)
    fs.copyFile(path.join(__dirname, 'files', file),
      path.join(__dirname, 'files-copy', file), (err) => {
        if (err) throw err; 
      });
  });
});

