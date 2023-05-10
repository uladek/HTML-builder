const fs = require('fs');
const path = require('path');
// const assetsFolder = fs.mkdir.path.join(__dirname, 'assets');
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
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

//BUNDLE HTML

fs.createReadStream(path.join(__dirname, 'template.html'));
let newHTML = '';
// const distHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
// const templateRead = fs.createReadStream(path.join(__dirname, 'template.html'));
//   templateRead.pipe(distHTML);

fs.readdir(path.join(__dirname, 'components'), {recursive: true}, (err, files) => {
  if (err) throw err; 
  // console.log(files);
 
  fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
    if (err) throw err; 
    newHTML= data.toString();
    // console.log(data.toString());
  
  });
// files.forEach((file) => {
  for (let file = 0 ; file < files.length; file++) {
    let tagInFile = `{{${(files[file]).replace(path.extname(files[file]), '')}}}`;

    fs.readFile(path.join(__dirname, 'components', files[file]),  (err, component) => {
      if (err) throw err; 

      // console.log(tagInFile);
      // let removeTAG = files.shift();
      // let tempTag = tagInFile.slice(2, 5);
      // console.log(files);
      // console.log(removeTAG);
      // console.log(tagInFile);
      // console.log(removeTAG === tempTag);

      let count = files.length;

      while (count > 0) {
        //без count сбивается newHTNL
        // newHTML = newHTML.replace(tagInFile, `${component.toString()}\n`);
        newHTML = newHTML.replace(tagInFile, component.toString());
        // console.log(newHTML.length);
        // console.log(newHTML.includes(tagInFile));
        //  if (newHTML.includes(tagInFile && newHTML.length === 4013)) {
        //   newHTML = newHTML.replace( tagInFile , '');
        //  }
        count--;
        //не комментить
        // console.log(count);
      }
      // if (file === files.length -1) {
      // distHTML.write(newHTML);
      // } 
      fs.writeFile(path.join(__dirname, 'project-dist','index.html'), newHTML,  (err) => {
        if (err) throw err;    
      
      });
    });
  }
});

//BUNDLE FOLDERS
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
  if (err) throw err; 
});
fs.readdir(path.join(__dirname, 'assets'), {recursive: true}, (err, folders) => {
  if (err) throw err; 
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