const fs = require('fs');
const path = require('path');
// const assetsFolder = fs.mkdir.path.join(__dirname, 'assets');
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) throw err; 
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
  if (err) throw err; 
});

//BUNDLE CSS
const distCSS = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err; 
  files.forEach((file) => {
    let extnameFile = path.extname(file.name);
    if (file.isFile()  &&  extnameFile === '.css' ) {
      const readCSS = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      readCSS.pipe(distCSS);
    }
  });
});

fs.createReadStream(path.join(__dirname, 'template.html'));
const distHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
 
// const templateRead = fs.createReadStream(path.join(__dirname, 'template.html'));
//   templateRead.pipe(distHTML);

fs.readdir(path.join(__dirname, 'components'), {recursive: true}, (err, files) => {
  if (err) throw err; 
  let newHTML = '';
  console.log(files);


  fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
    if (err) throw err; 
    newHTML = data.toString();
    // console.log(data.toString());
  
  });

// files.forEach((file) => {

 
for (let file = 0 ; file < files.length; file++) {

    let tagInFile = `{{${(files[file]).replace(path.extname(files[file]), '')}}}`;

    fs.readFile(path.join(__dirname, 'components', files[file]),  (err, chunk) => {
      if (err) throw err; 
      newHTML = newHTML.replace(tagInFile, chunk.toString());
      console.log(file);

      if (file === files.length -1) {
        distHTML.write(newHTML);
      }  
    });
  }
});



fs.readdir(path.join(__dirname, 'assets'), {recursive: true}, (err, folders) => {
  if (err) throw err; 
// console.log(path.join(__dirname, 'files'));
  folders.forEach((folder) => {
    //копировнаие папок
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder),
      { recursive: true }, (err) => {
        if (err) throw err; 
        // console.log(folder)
        fs.readdir(path.join(__dirname, 'assets', folder), {recursive: true}, (err, files) => {
          if (err) throw err; 
          files.forEach((file) => {
            fs.copyFile(path.join(__dirname, 'assets', folder, file),
              path.join(__dirname, 'project-dist', 'assets', folder, file), (err) => {
                if (err) throw err; 
              });
          });
        });
      });
  });
});