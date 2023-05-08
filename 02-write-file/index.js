
const fs = require('fs');
const path = require('path');
//2. Создание потока записи в текстовый файл
const writeStreamNewText = fs.createWriteStream(path.join(__dirname, 'text2.txt'));
const readline = require('readline');
const { stdin: input, stdout: output} = require('process');

const rl = readline.createInterface({ input, output });
rl.question('Hi! Welcome to node! What your name?\n', (answer) => {
//запись текста в файл
  writeStreamNewText.write(`${answer} \n`);
});

rl.on('line', (answer) => {
  if (answer.toString().trim() === 'exit'){
    console.log('Have a nice day!!'); 
    writeStreamNewText.write(' ');
    rl.close();
  } else {
    writeStreamNewText.write(`${answer} \n`);
  }
});
//проверка cntlC
rl.on('SIGINT', () => {
  console.log('Have a nice day!!');
  rl.close();
});