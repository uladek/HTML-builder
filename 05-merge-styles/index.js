
const fs = require('fs');
const path = require('path');
// const writeStreamNewText = fs.createWriteStream(path.join(__dirname, 'text2.txt'));
const dest = fs.createWriteStream(path.join(__dirname, '/project-dist/', 'bundle.css'));

// fs.createWriteStream(path.join(__dirname, 'text2.txt'));
fs.readdir(path.join(__dirname, '/styles/'), {withFileTypes: true}, (err, files) => {
    if (err) throw err; 
    // console.log(files)
    // console.log('read folder')
    files.forEach((file) => {
        // console.log(path.extname(file.name))
        let extnameFile = path.extname(file.name);
        if (file.isFile()  && extnameFile === '.css' ) {
        // let fileArg  = path.join(__dirname, '/styles/');
        const readCSS = fs.createReadStream(path.join(__dirname, 'styles', file.name));
        // file.pipe(dest)
                // console.log(readCSS)
        readCSS.on('data', (chunk) => {
            dest.write(chunk)
        //   console.log(data.toString());
        });
       // pipe связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи
        // readCSS.pipe(dest)
        }
        });
    });