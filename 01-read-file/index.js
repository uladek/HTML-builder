const fs = require('fs');
// import fs from 'fs';
// import() всегда использует загрузчик модулей ECMAScript.
// +  "type": "module" in package.json
const path = require('path');

// const readStreamText = fs.createReadStream('./01-read-file/text.txt');
const readStreamText = fs.createReadStream(path.join(__dirname, 'text.txt'));
// or
// const readStreamText = fs.createReadStream(path.resolve('01-read-file','text.txt'));
// or
// const readStreamText = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
readStreamText.on('data', (data) => {
// data - событие которое позволяет считывать данные (файла)
  console.log(String(data));
});